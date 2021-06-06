export interface AQIData {
    aqi: number;
    timeStamp: number;
}

export interface AQICityObject {
    [cityName: string]: AQIData[];
}

export interface SocketResponseObj {
    city: string;
    aqi: number;
}