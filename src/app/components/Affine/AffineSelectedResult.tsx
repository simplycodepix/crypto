import React from 'react';

const AffineSelectedResult = (props: any) => (
    <div className="analysis-selected-result">
        <div className="analysis-selected-result-title">{props.title}</div>
        <div className="analysis-selected-result-value">Text: {props.result.decodeResult}</div>
        <div className="analysis-selected-result-key">Key: {props.result.i}, {props.result.j}</div>
    </div>
);

export default AffineSelectedResult;