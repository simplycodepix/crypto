import React from 'react';

const CaesarResult = (props: any) => (
    <div className={props.selected ? 'analysis-result active' : 'analysis-result'} onClick={props.onClick} >
        <span className="title">Key {props.index + 1}:</span> <span className="value">{props.result}</span>
    </div>
);

export default CaesarResult;