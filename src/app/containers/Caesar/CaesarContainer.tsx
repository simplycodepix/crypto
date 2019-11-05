import React from 'react';
import { caesarCipher, caesarCipherAnalyser, frequencyCounter, compareFrequencies, getFrequencyInDecreasingOrder } from '../../ciphers/CaesarCipher';

import './index.css';
import CaesarResult from '../../components/Caesar/CaesarResult';
import CaesarSelectedResult from '../../components/Caesar/CaesarSelectedResult';

class Caesar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            encryptedMessage: '',
            inputValue: '',
            analysisText: '',
            inputShift: 5,
            analysisResults: [],
            selectedResultId: undefined,
            frequencyAnalysisResult: undefined
        }
    }

    runAnalysis = () => {
        const analysisResult = caesarCipherAnalyser(this.state.analysisText);
        let frequencyCounterResult = getFrequencyInDecreasingOrder(frequencyCounter(this.state.analysisText));
        let compareFrequenciesResult = compareFrequencies(frequencyCounterResult);
        let frequencyAnalysisResult = caesarCipher(this.state.analysisText, -1 * compareFrequenciesResult);

        this.setState({
            analysisResults: analysisResult,
            frequencyAnalysisResult,
            frequencyAnalysisResultKey: compareFrequenciesResult,
            selectedResultId: undefined
        })
    }

    handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleResultClick = (id: number) => {
        this.setState({
            selectedResultId: id
        })
    }

    isActiveResult = (id: number) => {
        return this.state.selectedResultId === id;
    }

    render() {
        const { inputValue, inputShift, analysisResults, selectedResultId, frequencyAnalysisResult, frequencyAnalysisResultKey } = this.state;

        return (
            <div className="caesar-page">
                <div className="container">

                    <h2 className="caesar-page-title">
                        Caesar cipher: Encode Text
                    </h2>

                    <div className="input-box">
                        <input type="text" placeholder="Text" name="inputValue" value={this.state.inputValue} onChange={this.handleInputChange} />
                        <input type="text" className="encode-shift" name="inputShift" value={this.state.inputShift} onChange={this.handleInputChange} />
                    </div>

                    <div className="text">
                        <div className="text-title">
                            Encoded Text:
                        </div>
                        <div className="text-value">
                            {caesarCipher(inputValue, inputShift)}
                        </div>
                    </div>


                    <div className="analysis">
                        <div className="analysis-content-wrap">
                            <h2 className="caesar-page-title">
                                Caesar cipher: Analyze Encoded Text
                            </h2>
                            <div className="input-box">
                                <input type="text" placeholder="Text" name="analysisText" value={this.state.analysisText} onChange={this.handleInputChange} />
                                <button onClick={this.runAnalysis}>Analyze</button>
                            </div>

                            <div className="analysis-content">
                                <div className="analysis-list">
                                    {analysisResults.map((result: any, i: number) => (
                                        <CaesarResult key={i} result={result} index={i} selected={this.isActiveResult(i)} onClick={() => this.handleResultClick(i)} />
                                    ))}
                                </div>
                                <div className="analysis-sidebar">
                                    {frequencyAnalysisResult ? <CaesarSelectedResult result={frequencyAnalysisResult} resultKey={frequencyAnalysisResultKey} title="Automatically Selected Result: " /> : null}
                                    {selectedResultId ? <CaesarSelectedResult result={analysisResults[selectedResultId]} resultKey={selectedResultId + 1} title="Selected Result: " /> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Caesar;