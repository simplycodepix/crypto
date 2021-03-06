import React, { useState, useEffect } from 'react';
import { zeros } from 'mathjs';

import { alphabet, hillCipherDecode } from '../../ciphers/HillCipher';
import { Matrix } from '../../components/Hill/Matrix';

import './index.css';

const HillContainer = () => {
    const matrixZeros: any = zeros(3, 3).valueOf();
    const [encodedText, setEncodedText] = useState('');
    const [withMatrix, setWithMatrix] = useState(false);
    const [formData, setFormData] = useState({ textToEncode: '', stringKey: '' });
    const [matrixData, setMatrixData] = useState(matrixZeros);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleMatrixChange = (event: any) => {
        const { name, value } = event.target;

        let matrixName = name.split('-')
        let matrixRow = parseInt(matrixName[0]);
        let matrixCol = parseInt(matrixName[1]);

        let newMatrix: any = [...matrixData];

        newMatrix[matrixRow][matrixCol] = parseInt(value);

        setMatrixData(newMatrix);
    }

    const handleEncode = () => {
        const { textToEncode, stringKey } = formData;

        if ((textToEncode.length % 3) === 0 && (stringKey.length % 3) === 0) {
            let encodeResult;
            if (withMatrix) {
                encodeResult = hillCipherDecode(textToEncode, matrixData, withMatrix).join('');
            } else {
                encodeResult = hillCipherDecode(textToEncode, stringKey).join('');
            }

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

                <div className="input-box">
                    {
                        withMatrix
                            ? <Matrix handleChange={handleMatrixChange} matrixData={matrixData} />
                            : <input
                                type="text"
                                placeholder="Key"
                                name="stringKey"
                                onChange={handleInputChange}
                            />
                    }

                    <button onClick={() => setWithMatrix(!withMatrix)}>
                        {withMatrix ? 'Key' : 'Matrix'}
                    </button>
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