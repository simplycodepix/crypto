import React from 'react';

interface IVigenereResult {
    keyWord: string,
    message: string
}

export const VigenereResult = ({ keyWord, message }: IVigenereResult) => (
    <div className="vigenere-result">
        <div className="vigenere-result-title">
            Key: 
        </div>
        <div className="vigenere-result-text">
            {keyWord}
        </div>
        <div className="vigenere-result-title">
            Message: 
        </div>
        <div className="vigenere-result-text">
            {message}
        </div>
    </div>
);