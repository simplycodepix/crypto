import { alphabetFrequency } from './frequency';

let loremText = 'Sd gkc zyzevkbscon sx dro 1960c gsdr dro bovokco yp Vodbkcod croodc myxdksxsxq Vybow Szcew zkcckqoc, kxn wybo bomoxdvi gsdr nocudyz zelvscrsxq cypdgkbo vsuo Kvnec ZkqoWkuob sxmvensxq fobcsyxc yp Vybow Szcew.';

interface IFrequency {
    char: string,
    frequency: number
}

export const caesarCipher = (text: string, shiftLength?: any, alphabet?: string): string => {
    let langLength: number = 26;

    if (shiftLength < 0)
        return caesarCipher(text, shiftLength + langLength);

    if (shiftLength !== undefined) {
        return text.split('').map((c: string) => {
            if (c.match(/[a-z]/i)) {
                let code = c.charCodeAt(0);
                let shift = code > 64 && code < 91 ? 65 : code > 96 && code < 123 ? 97 : 0;

                let encryptedC = String.fromCharCode((code - shift + parseInt(shiftLength)) % langLength + shift);
                return encryptedC;
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

export const frequencyCounter = (text: string) => {
    let frequencyArray: Array<any> = [];

    let textLength = text.length;

    text.split('').map(c => {
        if (!(frequencyArray.filter((entry: IFrequency) => entry.char === c.toUpperCase()).length > 0)) {
            if (c.match(/[a-z]/i)) {
                frequencyArray.push({ char: c.toUpperCase(), frequency: 1 });
            }
        } else {
            let found = frequencyArray.find((entry: IFrequency) => entry.char === c.toUpperCase());
            found.frequency++;
        }
    });

    frequencyArray.map((entry: IFrequency) => {
        entry.frequency = entry.frequency / textLength * 100
        return entry;
    })

    return frequencyArray;
}

export const getFrequencyInDecreasingOrder = (frequencyArray: any) => {
    return frequencyArray.sort((a: any, b: any) => b.frequency - a.frequency)
}

export const compareFrequencies = (frequencyArray: Array<IFrequency>) => {
    let alphabetFrequencyInOrder = getFrequencyInDecreasingOrder(alphabetFrequency);

    let aCharCode = alphabetFrequencyInOrder[0].char.charCodeAt(0);
    let bCharCode = frequencyArray[0].char.charCodeAt(0);

    return bCharCode - aCharCode;
}