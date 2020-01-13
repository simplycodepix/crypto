// import { getFrequencyInDecreasingOrder, frequencyCounter, compareFrequencies } from "./frequency";

export const affineCipher = (text: string, a: number, b: number, alphabet?: string) => {
    let langLength: number = 26;

    return text.split('').map((c: string) => {
        if (c.match(/[a-z]/i)) {
            let code = c.charCodeAt(0);
            let shift = code > 64 && code < 91 ? 65 : code > 96 && code < 123 ? 97 : 0;

            let encryptedCode = ((a * (code - shift) + b) % langLength) + shift;

            return String.fromCharCode(encryptedCode);
        }

        return c;
    }).join('');
}

export const affineCipherDecode = (text: string, a: number, b: number, alphabet?: string) => {
    let langLength: number = 26;
    let flag = 0, a_inv = 0;

    for (let i = 0; i < langLength; i++) {
        flag = (a * i) % langLength;

        if (flag === 1) { a_inv = i; }
    }

    if (a_inv === 0) return;
    console.log(text, a, b);

    return text.split('').map((c: string) => {
        if (c.match(/[a-z]/i)) {
            let code = c.charCodeAt(0);
            let shift = code > 64 && code < 91 ? 65 : code > 96 && code < 123 ? 97 : 0;

            let encryptedCode = (a_inv * (code + shift - b) % langLength) + shift;

            return String.fromCharCode(encryptedCode);
        }

        return c;
    }).join('');
}

export const affineCipherAnalyser = (text: string) => {
    let langLength: number = 26;
    let analysisResult = [];

    for (let i = 1; i <= langLength; i++) {
        for (let j = 1; j <= langLength; j++) {
            let decodeResult = affineCipherDecode(text, i, j);
            let result = { decodeResult, i, j };

            if (decodeResult) { analysisResult.push(result); }
        }
    }

    return analysisResult;
}

// UBBAHK CAPJKX