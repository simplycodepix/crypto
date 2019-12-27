import { matrix, multiply, inv, zeros, det, mod } from 'mathjs';

export let alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
// export let alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.toUpperCase().split('');
let alphabetLength = alphabet.length;
let alphabetFirstCode = alphabet[0].charCodeAt(0);
// let alphabetLastCode = alphabet[alphabetLength - 1].charCodeAt(0);
console.log('first code', alphabetFirstCode);
console.log('Length', alphabetLength);

const convertCharToItsPosition = (char: string) => mod(char.toUpperCase().charCodeAt(0), alphabetFirstCode);

const buildKeyMatrix = (key: string) => {
    let arr: any = [[], [], []];

    key.toUpperCase().split('').map((c, i) => {
        let dimension: any = mod(i, 3);

        let position = alphabet.indexOf(c);

        arr[dimension].push(position);

        return position;

        // return c;
    });

    return matrix(arr);
}

const splitMessage = (message: string) => {
    return message.toUpperCase().match(/.{1,3}/g);
}

const buildMessageTrigrams = (message: string) => {
    const splitedMessage: any = splitMessage(message);

    return splitedMessage.map((trigram: any) => {
        return trigram.split('').map((c: string) => alphabet.indexOf(c));
    });
}

const encrypt = (keyMatrix: any, messageTrigrams: any) => {
    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, keyMatrix).valueOf();

        return multiplyResult.map((item: number) => {
            console.log(item % alphabetLength, item);

            return alphabet[item % alphabetLength];
        }).join('');
    });
}

const egcd = (a: number, b: number) => {
    if (a === 0)
        return { gcd: b, x: 0, y: 1 };
    else {
        let { gcd, x, y }: any = egcd(b % a, a);
        return { gcd, x: y - (b / a) * x, y: x };
    }
}

// https://www.thecrazyprogrammer.com/2017/02/hill-cipher-c.html
const decrypt = (keyMatrix: any, messageTrigrams: any) => {

    const determinant: any = mod(Math.round(det(keyMatrix)), alphabetLength);
    let x: any, y: any;

    console.log(egcd(30, 50));




    // for (let i in reversedKeyMatrixValue)
    //     for (let trigram of messageTrigrams)
    //         for (let j in reversedKeyMatrixValue[i]) {
    //             console.log(trigram);

    //             // let code = alphabet[trigram[j]].charCodeAt(0);
    //             // matrixResult[i][j] = matrixResult[i][j] + reversedKeyMatrixValue[j][i] * code;
    //         }

    // console.log(messageTrigrams.valueOf());
    // console.log(reversedKeyMatrixValue);

    // return messageTrigrams.map((trigram: any) => {
    //     console.log('Trigram: ', trigram);

    //     trigram.map((c: any) => console.log(c.charCodeAt(0)));

    //     const matrixTrigram = matrix(trigram);
    //     const multiplyResult: any = multiply(matrixTrigram, reversedKeyMatrix).valueOf();

    //     console.log('Result: ', multiplyResult);

    //     return multiplyResult.map((item: number) => {
    //         let code = Math.abs(item % alphabetLength) + alphabetFirstCode;
    //         // let position = Math.round(code % alphabetFirstCode);

    //         // console.log(item);

    //         return alphabet[Math.floor(code % alphabetFirstCode)];
    //     }).join('');
    // });

    return [];
}

export const hillCipher = (message: string, key: any, withMatrix = false): Array<string> => {
    if (!message || !key) return [];
    try {
        const keyMatrix = withMatrix ? matrix(key) : buildKeyMatrix(key);
        console.log('matrix', keyMatrix);
        const messageTrigrams = buildMessageTrigrams(message);

        return decrypt(keyMatrix, messageTrigrams);
    } catch (error) {
        console.log(error);
    }

    return [];
};