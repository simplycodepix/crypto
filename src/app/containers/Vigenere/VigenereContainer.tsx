import React from 'react';

import './index.css'
import { viginereCipher } from '../../ciphers/VigenereCipher';
import { vigenereText } from '../../ciphers/text';
import { BaconResult } from '../../components/Bacon/BaconResult';

class VigenereContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            viginereText: '',
            decodeResult: undefined,
            blocks: [],
            index: 0,
            frequency: []
        }
    }

    handleInputChange = (event: { target: { name: any, value: any } }) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    decodeVigenereCipher = () => {
        let result = viginereCipher(this.state.viginereText);

        console.log(result);

        this.setState({
            decodeResult: result.key,
            blocks: result.blocks,
            frequency: result.frequency,
            index: result.index
        });
    }

    render() {
        const { viginereText, decodeResult, blocks, frequency } = this.state;

        return (
            <div className="bacon-page">
                <div className="container">
                    <h2 className="bacon-page-title">
                        Vigenere Cipher Decoder
                    </h2>

                    <div className="example">
                        <div className="example-title">
                            Example Text:
                        </div>
                        <div className="example-text">
                            {vigenereText}
                        </div>
                    </div>

                    <div className="input-box align-bottom">
                        <textarea placeholder="Text" id="viginereText" name="viginereText" value={viginereText} onChange={this.handleInputChange} />
                        <button onClick={this.decodeVigenereCipher}>Decode</button>
                    </div>

                    <div className="bacon-page-result">
                        {decodeResult ? <BaconResult result={decodeResult} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default VigenereContainer;