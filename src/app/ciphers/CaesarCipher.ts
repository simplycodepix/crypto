export const caesarCipher = (text: string, shiftLength?: any, alphabet?: string): string => {
    let langLength: number = 26;

    if (shiftLength < 0)
        return caesarCipher(text, shiftLength + langLength);

    if (shiftLength !== undefined) {
        return text.split('').map((c: string) => {
            if (c.match(/[a-z]/i)) {
                let code = c.charCodeAt(0);
                let shift = code > 64 && code < 91 ? 65 : code > 96 && code < 123 ? 97 : 0;

                let encryptedCode = (code - shift + parseInt(shiftLength)) % langLength + shift;

                return String.fromCharCode(encryptedCode);
            }

            return c;
        }).join('');
    } else {
        return text;
    }
}

export const caesarCipherAnalyser = (text: string) => {
    let langLength: number = 26;
    let analysisResult = [];

    for (let i = 1; i <= langLength; i++) {
        let encryptedText = caesarCipher(text, -i);

        analysisResult.push(encryptedText);
    }

    return analysisResult;
}