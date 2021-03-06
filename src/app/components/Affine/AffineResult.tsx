import React from 'react';

const AffineResult = (props: any) => (
    <div className={props.selected ? 'analysis-result active' : 'analysis-result'} onClick={props.onClick} >
        <span className="title">Key {props.keyI}, {props.keyJ}:</span> <span className="value">{props.result}</span>
    </div>
);

export default AffineResult;