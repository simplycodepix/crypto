import React from 'react';

const CaesarSelectedResult = (props: any) => (
    <div className="analysis-selected-result">
        <div className="analysis-selected-result-title">Selected result: </div>
        <div className="analysis-selected-result-value">Text: {props.result}</div>
        <div className="analysis-selected-result-key">Key: {props.resultKey}</div>
    </div>
);

export default CaesarSelectedResult;