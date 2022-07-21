import React from 'react'
import '../Styles/Snp.css'
import SaltImg from '../Assets/salt.png';
import PepperImg from '../Assets/pepper.png';
interface Props {
    isPlaying: boolean,
    id: number,
    isPepper: boolean,
    isSalt: boolean,
    canBeClicked: boolean,
    onClickFunction: (id: number) => void;
}
const SNPBox = ({ isPlaying, id, isPepper, isSalt, canBeClicked, onClickFunction }) => {
    const click = () => {
        onClickFunction(id);
        console.log("clicked");
    }
    if (isPepper)
        return (
            <div className="snp-box snp-pepper">
            <img src={PepperImg} />
        </div>
        )
    if (isSalt) {
        return (
            <div className="snp-box snp-salt">
                <img src={SaltImg} />
            </div>
        )
    }
    return (
        <div className="snp-box" onClick={click}>
        </div>
    )
}

export default SNPBox