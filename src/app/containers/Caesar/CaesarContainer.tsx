import React from 'react';
import { caesarCipher, caesarCipherAnalyser } from '../../ciphers/CaesarCipher';

import './index.css';

class Caesar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            encryptedMessage: '',
            inputValue: '',
            analysisText: '',
            inputShift: 5,
            analysisResults: []
        }
    }

    runAnalysis = () => {
        const analysisResult = caesarCipherAnalyser(this.state.analysisText);

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

    render() {
        const { inputValue, inputShift, analysisResults } = this.state;

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

                    <h2 className="caesar-page-title">
                        Caesar cipher: Analyze Encoded Text
                    </h2>

                    <div className="analysis">
                        <div className="input-box">
                            <input type="text" placeholder="Text" name="analysisText" value={this.state.analysisText} onChange={this.handleInputChange} />
                            <button onClick={this.runAnalysis}>Analyze</button>
                        </div>

                        {analysisResults.map((result: any, index: number) => (
                            <div key={index} className="analysis-result">
                                <span className="title">Key {index + 1}:</span> <span className="value">{result}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

export default Caesar;