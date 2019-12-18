import { matrix, multiply, inv } from 'mathjs';

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
// let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'.toUpperCase().split('');
let alphabetLength = alphabet.length;
let alphabetFirstCode = alphabet[0].charCodeAt(0);
// let alphabetLastCode = alphabet[alphabetLength - 1].charCodeAt(0);

const convertCharToItsPosition = (char: string) => char.toUpperCase().charCodeAt(0) % alphabetFirstCode;

const buildKeyMatrix = (key: string) => {
    let arr: any = [[], [], []];

    key.split('').map((c, i) => {
        if (c.match(/[a-z]/i)) {
            let dimension = i % 3;

            let position = convertCharToItsPosition(c);

            arr[dimension].push(position);

            return position;
        }

        return c;
    });

    return matrix(arr);
}

const splitMessage = (message: string) => {
    return message.toUpperCase().trim().replace(' ', '').match(/.{1,3}/g);
}

const buildMessageTrigrams = (message: string) => {
    const splitedMessage: any = splitMessage(message);

    return splitedMessage.map((trigram: any) => {
        return trigram.split('').map((c: string) => convertCharToItsPosition(c));
    });
}

const encrypt = (keyMatrix: any, messageTrigrams: any) => {
    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, keyMatrix).valueOf();

        return multiplyResult.map((item: number) => alphabet[item % alphabetLength]).join('');
    });
}

// https://www.thecrazyprogrammer.com/2017/02/hill-cipher-c.html
const decrypt = (keyMatrix: any, messageTrigrams: any) => {
    const reversedKeyMatrix = inv(keyMatrix);

    console.log(reversedKeyMatrix);

    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, reversedKeyMatrix).valueOf();

        return multiplyResult.map((item: number) => alphabet[item % alphabetLength]).join('');
    });
}

export const hillCipher = (message: string, key: any, withMatrix = false): Array<string> => {
    if (!message || !key) return [];

    const keyMatrix = withMatrix ? matrix(key) : buildKeyMatrix(key);
    const messageTrigrams = buildMessageTrigrams(message);

    return encrypt(keyMatrix, messageTrigrams);
};