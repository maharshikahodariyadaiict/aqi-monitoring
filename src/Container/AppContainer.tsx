import React from 'react';
import './AppContainer.css';
import { AQICityObject, AQIData, SocketResponseObj } from '../Shared/Types/Types';
import { useWebSocket } from '../Components/Hooks/WebSocket';
import Constants from '../Shared/Constants';
import { Card, Legends, ToastMessage} from '../Components';

interface Props { }

interface Action {
    payload: SocketResponseObj[] | null
}

const reducer = (prevState: AQICityObject, action: Action) => {
    if (action.payload && action.payload.length) {
        const timeStamp = new Date().getTime();
        const newState = { ...prevState };
        action.payload.forEach((each: SocketResponseObj) => {
            const obj: AQIData = {
                timeStamp: timeStamp,
                aqi: Math.round(100 * each.aqi) / 100,
            }
            if (!newState[each.city]) {
                newState[each.city] = []
            }
            newState[each.city].push(obj);
        });

        return newState;
    }
    return prevState;
}

const AppContainer: React.FC<Props> = props => {
    const [aqiData, dispatch] = React.useReducer(reducer, {});

    const onMessage = (event: MessageEvent) => {
        const data: SocketResponseObj[] | null = JSON.parse(event.data);
        dispatch({ payload: data })
    };

    const socketStatus = useWebSocket(Constants.aqiWebSocketUrl, onMessage);

    const comparator = (a: string, b: string) => {
        return a > b ? 1 : -1;
    }

    return (
        <div className="app-container">
            <div className="app-header">
                <div className="app-heading">
                    Central Pollution Control Board
                </div>
                <Legends minVal={Constants.minAQI} maxVal={Constants.maxAQI} />
            </div>
            {Object.keys(aqiData).length > 0 ? <>
                <div className="aqi-data-container">
                    {Object.keys(aqiData).sort(comparator).map((cityName: string) => {
                        return <Card key={cityName} cityName={cityName} cityData={aqiData[cityName]} />
                    })}
                </div>

            </> : <div className="app-fallback">{socketStatus.wsState === 0 ? 'Loading...' : 'Data Not available'}</div>}
            {socketStatus.message && <ToastMessage text={socketStatus.message} onCloseToastMessage={() => socketStatus.setMessage(null)} />}
        </div>
    );
}

export default AppContainer;