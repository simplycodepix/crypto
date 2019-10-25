import React from 'react';
import caesarCipher from '../../ciphers/CaesarCipher';

class Caesar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            encryptedMessage: ['a', 'v']
        }
    }

    visualizeCaesarCipher = () => {
        const text = caesarCipher('Hfjxfw', -5, 'en');

        for (let c in text) {
            let newEncryptedMessage = this.state.encryptedMessage.push(text[c]);


            console.log(newEncryptedMessage);

            // setTimeout(() => {
            //     this.setState({
            //         encryptedMessage: newEncryptedMessage
            //     })
            // }, 100);
        }
    }

    render() {
        return (
            <div className="caesar-page">
                <div className="container">
                    <button onClick={() => this.visualizeCaesarCipher()}>
                        Visualize
                    </button>

                    {this.state.encryptedMessage.map((element: any) => {
                        return (
                            <div key={element}>{element}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Caesar;