import React, { useEffect, useState } from 'react'
import '../Styles/Snp.css'
import SaltImg from '../Assets/salt.png';
import PepperImg from '../Assets/pepper.png';
interface Props {
    isPlaying: boolean,
    id: number,
    isEmpty: boolean,
    isEgg: boolean,
    HasBeenSeen: boolean,
    canBeClicked: boolean,
    floor: number,
    onClickFunction: (id: number, floor:number) => void;
}
const TowerBox = ({ isPlaying, id, isEmpty, isEgg,HasBeenSeen, canBeClicked, floor, onClickFunction }:Props) => {
    const [isShaking, setIsShaking] = useState(false);
    const click = () => {
        setIsShaking(true);
        if(canBeClicked)
        {
            setTimeout(() =>{
    
                onClickFunction(id, floor);
            },400);
        }
    }
    useEffect(() => {
        setIsShaking(false)
    },[isPlaying])
    // if (isPepper)
    //     return (
    //         <div className="snp-box snp-pepper">
    //         <img src={PepperImg} />
    //     </div>
    //     )
    // if (isSalt) {
    //     return (
    //         <div className="snp-box snp-salt">
    //             <img src={SaltImg} />
    //         </div>
    //     )
    // }
    // return (
    //     <div className={`snp-box ${isShaking ? "snp-shake" : ""}`} onClick={click}>
    //     </div>
    // )
    if(HasBeenSeen)
    {
        return( <div className="tower-box tower-box-seen">
    </div>) 
    }
    if(isEmpty)
    {   return( <div className="tower-box tower-box-empty">
    </div>)
    }
    if(isEgg)
    {   return( <div className="tower-box tower-box-egg">
    </div>)
    }
    return (
        <div className={`tower-box ${isShaking ? "snp-shake" : ""}`} onClick={click}>
        </div>
    )
}

export default TowerBox