const caesarCipher = (text: string, shiftLength: number, lang: string) => {
    let langLength: number = 26;
    let textLength: number = text.length;
    let encryptedCharacters: Array<string> = [];
    let counter: number = 0;

    text.split('').map((c: string) => {
        counter++;

        if (c.match(/[a-z]/i)) {
            let charCode = c.charCodeAt(0);
            let shift = charCode >= 65 && charCode <= 90 ? 65 : charCode >= 97 && charCode <= 122 ? 97 : 0;
            let encryptedC = String.fromCharCode(((charCode - shift + shiftLength) % langLength) + shift);

            encryptedCharacters.push(encryptedC);
            return encryptedC;
        } else {
            encryptedCharacters.push(c);
            return c;
        }
    });

    if (counter === textLength) {
        return encryptedCharacters;
    }
}

export default caesarCipher;