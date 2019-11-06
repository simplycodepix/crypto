import React from 'react';

import { baconCipher } from '../../ciphers/BaconCipher';
import './index.css'
import { BaconResult } from '../../components/Bacon/BaconResult';

class BaconContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            baconText: '',
            decodeResult: undefined
        }
    }

    handleInputChange = (event: { target: { name: any, value: any } }) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    decodeBaconCipher = () => {
        let result = baconCipher(this.state.baconText);

        this.setState({
            decodeResult: result
        });
    }

    render() {
        const { baconText, decodeResult } = this.state;

        return (
            <div className="bacon-page">
                <div className="container">
                    <h2 className="bacon-page-title">
                        Bacon Cipher Decoder
                    </h2>

                    <div className="example">
                        <div className="example-title">
                            Example Text:
                        </div>
                        <div className="example-text">
                            CrYPtogRapHY iS a ScIEnce Of «seCrET wriTinG». FOr aT Least Two THoUsANd
                            yeaRS ThErE haVE bEeN peOPlE WHo WAnTeD to SEnd MESsaGes WHiCh coUlD
                            oNly bEen rEAd bY tHe pEOPLe FoR whOm tHey were iNteNdeD. a loT oF different
                            MEtHODs FoR coNcEalING mEssageS WerE invENtED stARTING WIth AnCIeNt
                            cIPHerS lIKE «SkytaLE» and «ATBAsH» and ending wiTH MOdErn SymmeTRiC ANd
                            PubliC-kEy enCRYptioN ALGOriTHmS SUch aS AeS and Rsa. the dEVELopMENT Of
                            crYPtOgRaPHy cOntiNueS And NEVER sTopS! decrYPt THe mESsaGe tHat iS hIDdEn
                            in thE teXT oF this TASk! tHE aLphabet FoR THE mEssAGE ConsisTs of ALl tWEnTy six
                            enGliSh letTERS from «a» To «z» ANd Six puNCTuaTIoN MARkS « », «.», «,», «!», «?»,
                            «’».
                        </div>
                    </div>

                    <div className="input-box align-bottom">
                        <textarea placeholder="Text" id="baconText" name="baconText" value={baconText} onChange={this.handleInputChange} />
                        <button onClick={this.decodeBaconCipher}>Decode</button>
                    </div>

                    <div className="bacon-page-result">
                        {decodeResult ? <BaconResult result={decodeResult} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default BaconContainer;