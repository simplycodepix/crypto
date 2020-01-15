import React from 'react';

import './index.css'
import { viginereCipher } from '../../ciphers/VigenereCipher';
import { vigenereText } from '../../ciphers/text';
import { VigenereResult } from '../../components/Vigenere/VigenereResult';

interface IInfoBlock {
    name: string,
    value: string
}

const InfoBlock = ({ name, value }: IInfoBlock) => (
    <div className="info-block">
        <div className="info-block-title">
            {name}
        </div>
        <div className="info-block-value">
            {value}
        </div>
    </div>
)

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
            index: result.index,
            decryptedMessage: result.decrypted
        });
    }

    render() {
        const { viginereText, decodeResult, blocks, frequency, decryptedMessage, index } = this.state;

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
                        {decodeResult ? <VigenereResult keyWord={decodeResult} message={decryptedMessage} /> : null}
                    </div>

                    <div className="info">
                        <InfoBlock name="Index: " value={index} />
                    </div>

                    <div className="info">
                        {frequency.map((entry: IInfoBlock, i: number) => <InfoBlock key={`frq-${i}`} name={entry.name} value={entry.value} />)}
                    </div>

                    <div className="info">
                        {blocks.map((entry: any, i: number) => <InfoBlock key={`blck-${i}`} name="Text Block: " value={entry.str} />)}
                    </div>

                </div>
            </div>
        );
    }
}

export default VigenereContainer;