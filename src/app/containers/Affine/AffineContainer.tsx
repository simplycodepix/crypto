import React from 'react';
import { affineCipher, affineCipherAnalyser } from '../../ciphers/AffineCipher';

import './index.css';
import AffineResult from '../../components/Affine/AffineResult';
import AffineSelectedResult from '../../components/Affine/AffineSelectedResult';

class Affine extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            encryptedMessage: '',
            inputValue: '',
            analysisText: '',
            inputShiftA: 3,
            inputShiftB: 4,
            analysisResults: [],
            selectedResultId: undefined,
            frequencyAnalysisResult: undefined
        }
    }

    runAnalysis = async () => {
        const analysisResult = affineCipherAnalyser(this.state.analysisText);

        this.setState({
            analysisResults: analysisResult
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
        const { inputValue, inputShiftA, inputShiftB, analysisResults, selectedResultId, frequencyAnalysisResult, frequencyAnalysisResultKey } = this.state;

        return (
            <div className="caesar-page">
                <div className="container">

                    <h2 className="caesar-page-title">
                        Affine cipher: Encode Text
                    </h2>

                    <div className="input-box">
                        <input type="text" placeholder="Text" name="inputValue" value={inputValue} onChange={this.handleInputChange} />
                        <input type="text" className="encode-shift" name="inputShiftA" value={inputShiftA} onChange={this.handleInputChange} />
                        <input type="text" className="encode-shift" name="inputShiftB" value={inputShiftB} onChange={this.handleInputChange} />
                    </div>

                    <div className="text">
                        <div className="text-title">
                            Encoded Text:
                        </div>
                        <div className="text-value">
                            {affineCipher(inputValue, parseInt(inputShiftA), parseInt(inputShiftB))}
                        </div>
                    </div>


                    <div className="analysis">
                        <div className="analysis-content-wrap">
                            <h2 className="caesar-page-title">
                                Affine cipher: Analyze Encoded Text
                            </h2>
                            <div className="input-box">
                                <input type="text" placeholder="Text" name="analysisText" value={this.state.analysisText} onChange={this.handleInputChange} />
                                <button onClick={this.runAnalysis}>Analyze</button>
                            </div>

                            <div className="analysis-content">
                                <div className="analysis-list">
                                    {analysisResults.map((result: any, i: number) => (
                                        <AffineResult keyI={result.i} keyJ={result.j} key={i} result={result.decodeResult} index={i} selected={this.isActiveResult(i)} onClick={() => this.handleResultClick(i)} />
                                    ))}
                                </div>
                                <div className="analysis-sidebar">
                                    {frequencyAnalysisResult ? <AffineSelectedResult result={frequencyAnalysisResult} resultKey={frequencyAnalysisResultKey} title="Automatically Selected Result: " /> : null}
                                    {selectedResultId ? <AffineSelectedResult result={analysisResults[selectedResultId]} title="Selected Result: " /> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Affine;