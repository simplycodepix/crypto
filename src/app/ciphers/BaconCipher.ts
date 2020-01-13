let alphabet = 'abcdefghijklmnopqrstuvwxyz .,!?’';

const convertBinaryToDecimal = (binary: string): number => parseInt((binary).replace(/[^01]/gi, ''), 2);

export const baconCipher = (text: string) => {
    let encodedText = text.split('').map(c => {
        if (c.match(/[a-z]/i)) {
            let code = c.charCodeAt(0);

            return code > 64 && code < 91 ? 1 : code > 96 && code < 123 ? 0 : 0;
        }

        return null;
    }).join('');

    let splitEncodedText: any = encodedText.match(/.{1,5}/g);
    let alphabetArray = alphabet.split('');
    
    return splitEncodedText.map((entry: string) => {
        let letter = alphabetArray[convertBinaryToDecimal(entry)];

        return letter ? letter : ' ';
    }).join('');
};