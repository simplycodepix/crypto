import React, { useState, useEffect } from 'react';
import { zeros } from 'mathjs';

import { alphabet, hillCipherDecode, analyseCipher } from '../../ciphers/HillCipher';
import { Matrix } from '../../components/Hill/Matrix';

import './index.css';

const HillContainer = () => {
    const matrixZeros: any = zeros(3, 3).valueOf();
    const [encodedText, setEncodedText] = useState('');
    const [withMatrix, setWithMatrix] = useState(false);
    const [formData, setFormData] = useState({ textToEncode: '', cipheredText: '', openText: '' });
    const [matrixData, setMatrixData] = useState(matrixZeros);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleEncode = () => {
        const { textToEncode, cipheredText, openText } = formData;

        if ((textToEncode.length % 3) === 0 && textToEncode.length > 0 && openText.length === 9 && cipheredText.length === 9) {

            let encodeResult;
            encodeResult = analyseCipher(textToEncode, cipheredText, openText).join('');

            setEncodedText(encodeResult);
        }

        return encodedText;
    }

    useEffect(() => {
        handleEncode();
    }, [formData]);

    // console.log(hillCipher('PAYMOREMONEY', 'HILLMAGIC'));
    return (
        <div className="hill-page">
            <div className="container">
                <h2 className="hill-page-title">
                    Hill cipher: Decode Text
                </h2>

                <div className="matrices">
                    <div className="input-box">
                        <div className="input-box-title">
                            Ciphered text: эзопьтвеы
                        </div>
                        <input
                            type="text"
                            placeholder="Key"
                            name="cipheredText"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <div className="input-box-title">
                            Open text: уквисполь
                        </div>
                        <input
                            type="text"
                            placeholder="Key"
                            name="openText"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>


                <div className="input-box align-bottom">
                    <textarea placeholder="Text" id="textToEncode" name="textToEncode" onChange={handleInputChange} />
                </div>

                <div className="text">
                    <div className="text-title">
                        Decoded Text:
                    </div>
                    <div className="text-value">
                        {encodedText}
                    </div>
                </div>

                <div className="info-box">
                    Alphabet : {alphabet.join('')}
                </div>
            </div>
        </div>
    )
};

export default HillContainer;