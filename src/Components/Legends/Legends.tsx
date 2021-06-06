import React from 'react';
import './Legends.css';

interface Props {
    minVal: number;
    maxVal: number;
}

const Legends: React.FC<Props> = props => {

    return (
        <div className="legends-container">
            <div className="legend-desc">
                Air Quaility Index Map
                </div>
            <div className="legend-color-wrapper">
                <div className="legend-color-pallete" />
                <div className="legend-values">
                    <span>{props.minVal}</span>
                    <span>{props.maxVal}</span>
                </div>
            </div>
        </div>
    );
}

export default Legends;