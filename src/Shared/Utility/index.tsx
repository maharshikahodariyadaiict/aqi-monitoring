import Constants from "../Constants";

export const getLastUpdatedTime = (lastStamp: number) => {
    const currStamp = new Date().getTime();
    
    const durationInSec = Math.round((currStamp - lastStamp + 1000)/1000);
    const days = Math.round(Math.floor(durationInSec / Constants.secInDay));
    const hours = Math.round(Math.floor(durationInSec / Constants.secInHour));
    const mins = Math.round(Math.floor(durationInSec / Constants.secInMin));

    if(days > 0) {
        return `last updated ${days} ${days > 1 ? 'days' : 'day'} ago`;
    } else if(hours > 0) {
        return `last updated ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    } else if(mins > 0) {
        return `last updated ${mins} ${mins > 1 ? 'mins' : 'min'} ago`;
    } else if(durationInSec > 0) {
        return `last updated ${durationInSec} ${durationInSec > 1 ? 'seconds' : 'second'} ago`;
    }
    return '';
}
