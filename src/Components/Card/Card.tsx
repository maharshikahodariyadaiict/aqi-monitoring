import React, { useRef } from 'react';
import './Card.css';
import { AQIData } from '../../Shared/Types/Types';
import { getLastUpdatedTime } from '../../Shared/Utility';
import { Chart } from '../';
import Constants from '../../Shared/Constants';
import { LeftArrow } from '../../Assets';

interface Props {
    cityData: AQIData[];
    cityName: string;
}

const Card: React.FC<Props> = props => {
    const [showGraph, setShowGraph] = React.useState<boolean>(false);
    const latestData: AQIData = props.cityData[props.cityData.length - 1];
    const [lastUpdated, setLastUpdated] = React.useState<string>(getLastUpdatedTime(latestData.timeStamp));

    const timeoutRef = useRef<any>(null);
    
    React.useEffect(() => {
        setLastUpdated((prev) => getLastUpdatedTime(latestData.timeStamp));
    }, [latestData.timeStamp])

    React.useEffect(() => {
        let timeOutInSec = 5;
        if (lastUpdated.includes("min")) {
            timeOutInSec = Constants.secInMin;
        } else if(lastUpdated.includes("hour")) {
            timeOutInSec = Constants.secInHour;
        } else if(lastUpdated.includes("day")) {
            timeOutInSec = Constants.secInDay;
        }
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
            setLastUpdated((prev) => getLastUpdatedTime(latestData.timeStamp))
        }, timeOutInSec*1000);
        
    }, [lastUpdated]);


    const computeClassName = (aqi: number) => {
        if (aqi <= 50) {
            return 'aqi-good';
        } else if (aqi > 50 && aqi <= 100) {
            return 'aqi-satisfactory';
        } else if (aqi > 100 && aqi <= 200) {
            return 'aqi-moderate';
        } else if (aqi > 200 && aqi <= 300) {
            return 'aqi-poor';
        } else if (aqi > 300 && aqi <= 400) {
            return 'aqi-very-poor';
        } else if (aqi > 400) {
            return 'aqi-severe';
        }
    }

    return (
        <div className={`card-container ${computeClassName(latestData.aqi)}`}>
            <div className="details" onClick={() => setShowGraph(prev => !prev)}>
                <div className="city-name">
                    {props.cityName}
                </div>
                <div className="aqi">
                    {latestData.aqi}
                </div>
                <div className="last-updated">
                    {lastUpdated}
                </div>
                <div className={`accordion ${showGraph ? 'acc-open' : 'acc-close'}`}>
                    <img className="accordion-img" src={LeftArrow} /> 
                </div>
            </div>
            
            {showGraph && <div className={`extra-container ${showGraph ? 'show-graph' : 'hide-graph'}`}>
                <Chart data={props.cityData} id={`card-${props.cityName.split(" ")[0]}`} />
            </div>}
        </div>
    );
}

export default Card;