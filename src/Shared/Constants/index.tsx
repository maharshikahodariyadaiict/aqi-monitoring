interface Constant {
    aqiWebSocketUrl: string;
    maxAQI: number;
    minAQI: number;
    secInDay: number;
    secInHour: number;
    secInMin: number;
}

const Constants: Constant = {
    aqiWebSocketUrl: 'ws://city-ws.herokuapp.com',
    maxAQI: 500,
    minAQI: 0,
    secInDay: 86400,
    secInHour: 3600,
    secInMin: 60
}

export default Constants;