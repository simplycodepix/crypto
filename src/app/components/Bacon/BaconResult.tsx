import React from 'react';

export const BaconResult = (props: any) => (
    <div className="bacon-result">
        <div className="bacon-result-title">
            Result: 
        </div>
        <div className="bacon-result-text">
            {props.result}
        </div>
    </div>
);