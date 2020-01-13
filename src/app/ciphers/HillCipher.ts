// Готовые методы для математических вычислений
import { matrix, multiply, inv, det, mod, transpose } from 'mathjs';

export let alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'.toUpperCase().split('');
let alphabetLength = alphabet.length;

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

function modInverse(a: any, m: any) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
        return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
        return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

const encrypt = (keyMatrix: any, messageTrigrams: any) => {
    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, keyMatrix).valueOf();

        return multiplyResult.map((item: number) => {
            return alphabet[item % alphabetLength];
        }).join('');
    });
}

const adjudantMatrix = (matrix: any) => {
    return matrix.map((row: any) => {
        return row.map((number: any) => {
            return mod(Math.round(number), alphabetLength);
        });
    })
};

const inverseKeyMatrix = (keyMatrix: any) => {
    const inversedMatrix: any = inv(keyMatrix).valueOf();

    let determinant: any = Math.round(det(keyMatrix));
    let inversedDeterminant = modInverse(determinant, alphabetLength);
    let algDop = multiply(determinant, inversedMatrix);
    let adjudantKeyMatrix = adjudantMatrix(algDop);
    let modInversedMatrix = adjudantMatrix(multiply(inversedDeterminant, adjudantKeyMatrix));

    return modInversedMatrix;
}

const decrypt = (keyMatrix: any, messageTrigrams: any) => {
    const inversedMatrix: any = inv(keyMatrix.valueOf()).valueOf();

    let determinant: any = Math.round(det(keyMatrix));
    let inversedDeterminant = modInverse(determinant, alphabetLength);
    let algDop = multiply(determinant, inversedMatrix);
    let adjudantKeyMatrix = adjudantMatrix(algDop);
    let modInversedMatrix = adjudantMatrix(multiply(inversedDeterminant, adjudantKeyMatrix));

    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, modInversedMatrix).valueOf();

        return multiplyResult.map((item: number) => {
            return alphabet[item % alphabetLength];
        }).join('');
    });
}

export const analyseCipher = (message: string, cipheredKey: string, openKey: string) => {
    const cipheredKeyMatrix = buildKeyMatrix(cipheredKey);
    const openKeyMatrix = buildKeyMatrix(openKey);
    const inversedOpenKeyMatrix = inverseKeyMatrix(openKeyMatrix);
    const matrixMultiply = adjudantMatrix(multiply(cipheredKeyMatrix, inversedOpenKeyMatrix).valueOf());
    const inverseMultipliedMatrix: any = transpose(inverseKeyMatrix(matrixMultiply));

    console.log(matrixMultiply);
    console.log(inverseMultipliedMatrix);

    const messageTrigrams = buildMessageTrigrams(message);
    return messageTrigrams.map((trigram: any) => {
        const matrixTrigram = matrix(trigram);
        const multiplyResult: any = multiply(matrixTrigram, inverseMultipliedMatrix).valueOf();

        return multiplyResult.map((item: number) => {
            return alphabet[item % alphabetLength];
        }).join('');
    });
}
// мддгодщвпнеъгиаорюнкчпьтвеысяъаххифьккмпюжэзо

export const hillCipher = (message: string, key: any, withMatrix = false): Array<string> => {
    if (!message || !key) return [];
    try {
        const keyMatrix = withMatrix ? matrix(key) : buildKeyMatrix(key);
        const messageTrigrams = buildMessageTrigrams(message);

        return encrypt(keyMatrix, messageTrigrams);
    } catch (error) {
        console.log(error);
    }

    return [];
};

export const hillCipherDecode = (message: string, key: any, withMatrix = false): Array<string> => {
    if (!message || !key) return [];
    try {
        const keyMatrix = withMatrix ? matrix(key) : buildKeyMatrix(key);
        const messageTrigrams = buildMessageTrigrams(message);

        return decrypt(keyMatrix, messageTrigrams);
    } catch (error) {
        console.log(error);
    }

    return [];
};