export const alphabetFrequency = [
    {
        char: 'A',
        frequency: 8.15,
    },
    {
        char: 'B',
        frequency: 1.44,
    },
    {
        char: 'C',
        frequency: 2.76,
    },
    {
        char: 'D',
        frequency: 3.79,
    },
    {
        char: 'E',
        frequency: 13.11,
    },
    {
        char: 'F',
        frequency: 2.91,
    },
    {
        char: 'G',
        frequency: 1.99,
    },
    {
        char: 'H',
        frequency: 5.26,
    },
    {
        char: 'I',
        frequency: 6.35,
    },
    {
        char: 'J',
        frequency: 0.13,
    },
    {
        char: 'K',
        frequency: 0.42,
    },
    {
        char: 'L',
        frequency: 3.39,
    },
    {
        char: 'M',
        frequency: 2.54,
    },
    {
        char: 'N',
        frequency: 7.1,
    },
    {
        char: 'O',
        frequency: 8.0,
    },
    {
        char: 'P',
        frequency: 1.98,
    },
    {
        char: 'R',
        frequency: 6.83,
    },
    {
        char: 'S',
        frequency: 6.1,
    },
    {
        char: 'T',
        frequency: 10.47,
    },
    {
        char: 'U',
        frequency: 2.46,
    },
    {
        char: 'V',
        frequency: 0.92,
    },
    {
        char: 'W',
        frequency: 1.54,
    },
    {
        char: 'X',
        frequency: 0.17,
    },
    {
        char: 'Y',
        frequency: 1.98,
    },
    {
        char: 'Z',
        frequency: 0.08,
    }
];


interface IFrequency {
    char: string,
    frequency: number
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

        return c;
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