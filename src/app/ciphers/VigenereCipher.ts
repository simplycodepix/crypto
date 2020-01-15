let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split('');
let alphabetLength = alphabet.length;
let table = 'о';
let isLetter = (c: string): boolean => c.toLowerCase() != c.toUpperCase();

export const buildKeyForBlock = (text: string, test?: boolean) => {
    let splittedText = text.split('');
    let splittedTextCount: number = splittedText.length;

    let frequencyArray: Array<object> = [];
    let countLetters: number = 0;

    for (let i = 0; i < alphabet.length; i++) {
        splittedText.forEach(c => {
            if (c == alphabet[i]) countLetters++;
        });

        frequencyArray.push({
            name: alphabet[i],
            value: (countLetters / splittedTextCount)
        });

        countLetters = 0;
    }

    let maxValue = Math.max.apply(Math, frequencyArray.map(function (o: any) { return o.value; }));
    let maxKey: any = frequencyArray.find((entry: any) => entry.value === maxValue);
    let secondMaxKey: any = frequencyArray.find((entry: any) => entry.value === maxKey.value && entry.name !== maxKey.name);

    let indexO = 0;
    let indexMax = 0;

    for (let j = 0; j < alphabet.length; j++) {
        indexO = alphabet.indexOf(table);
        if (test && secondMaxKey) {
            indexMax = alphabet.indexOf(secondMaxKey.name);
        } else {
            indexMax = alphabet.indexOf(maxKey.name);
        }
    }

    let key = 0;
    if (indexO > indexMax) {
        key = indexMax - indexO + alphabet.length;
    } else {
        key = indexMax - indexO;
    }

    return key;
};

export const removeSpaces = (text: string) => {
    return text.split('').map((c: string) => { if (isLetter(c)) return c; }).join('');
}

export const decryptViginereCipher = (text: string, key: string): string => {
    let lowerCaseText = text.toLowerCase();
    let textWithoutSpaces = removeSpaces(lowerCaseText);
    let splittedText = textWithoutSpaces.split('');
    let textLength = textWithoutSpaces.length;
    let decryptedMessage = [];
    let newKey = [];

    for (let i = 0, j = 0; i < textLength; ++i, ++j) {
        if (j === key.length)
            j = 0;

        newKey[i] = key[j];
    }

    for (let i = 0; i <= textLength; i++) {
        let indexText = alphabet.indexOf(splittedText[i]);
        let indexKey = alphabet.indexOf(newKey[i]);

        let result = (indexText - indexKey + alphabetLength) % alphabetLength;
        decryptedMessage.push(alphabet[result]);
    }

    return decryptedMessage.join('');
};

export const viginereCipher = (text: string) => {
    let keyLength: number = 6;
    let lowerCaseText: string = text.toLowerCase();

    let textWithoutSpaces: string = removeSpaces(lowerCaseText);

    let textLength: number = textWithoutSpaces.length;

    let tempStr: string = '';

    for (let i = 0; i < textLength; i = i + keyLength) {
        tempStr += textWithoutSpaces[i];
    }

    let tempStrLength: number = tempStr.length;

    let countLetters = 0;
    let frequencyArray: Array<object> = [];
    let splitTmpStr = tempStr.split('');

    for (let i = 0; i < alphabet.length; i++) {
        splitTmpStr.forEach(c => {
            if (c == alphabet[i]) countLetters++;
        });

        frequencyArray.push({
            name: alphabet[i],
            value: (countLetters * (countLetters - 1)) / (tempStrLength * (tempStrLength - 1))
        });

        countLetters = 0;
    }

    let index = 0;
    frequencyArray.forEach((item: any) => {
        index += item.value;
    });

    let blockStr1 = '';
    let blockStr2 = '';
    let blockStr3 = '';
    let blockStr4 = '';
    let blockStr5 = '';
    let blockStr6 = '';

    for (let i = 0; i < textLength; i = i + keyLength) { blockStr1 += textWithoutSpaces[i]; }
    for (let i = 1; i < textLength; i = i + keyLength) { blockStr2 += textWithoutSpaces[i]; }
    for (let i = 2; i < textLength; i = i + keyLength) { blockStr3 += textWithoutSpaces[i]; }
    for (let i = 3; i < textLength; i = i + keyLength) { blockStr4 += textWithoutSpaces[i]; }
    for (let i = 4; i < textLength; i = i + keyLength) { blockStr5 += textWithoutSpaces[i]; }
    for (let i = 5; i < textLength; i = i + keyLength) { blockStr6 += textWithoutSpaces[i]; }

    let firstKey = buildKeyForBlock(blockStr1, true);
    let secondKey = buildKeyForBlock(blockStr2);
    let thirdKey = buildKeyForBlock(blockStr3);
    let fourthKey = buildKeyForBlock(blockStr4);
    let fifthKey = buildKeyForBlock(blockStr5);
    let sixthKey = buildKeyForBlock(blockStr6);

    let keyWord = [
        alphabet[firstKey],
        alphabet[secondKey],
        alphabet[thirdKey],
        alphabet[fourthKey],
        alphabet[fifthKey],
        alphabet[sixthKey]
    ].join('');

    let decryptedMessage = decryptViginereCipher(text, keyWord);

    return {
        key: keyWord,
        decrypted: decryptedMessage,
        index,
        blocks: [
            { str: blockStr1 },
            { str: blockStr2 },
            { str: blockStr3 },
            { str: blockStr4 },
            { str: blockStr5 },
            { str: blockStr6 },
        ],
        frequency: frequencyArray
    };
};

