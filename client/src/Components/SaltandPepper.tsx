import React, { useEffect, useState } from 'react';
import { ActionMeta, InputActionMeta } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';
import SNPBox from './SNPBox';
import '../Styles/Snp.css';

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    },
    updateUser: (user: User) => void;

}
interface User {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
}
interface Box {
    id:number,
    isSalt: boolean,
    isPepper: boolean,
    canBeClicked: boolean
}
function SaltandPepper({ user, updateUser }: Props) {


    const [betAmount, setBetAmount] = useState(0);
    const [peppers, setPeppers] = useState(0);
    const snpColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const [boxes, setBoxes] = useState<Array<Box>>(snpColumns.map((e) => {return (
        {
            id: e,
            isSalt:false,
            isPepper:false,
            canBeClicked:true
    });}));
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (betAmount > user.balance) setBetAmount(user.balance);
        if (betAmount < 0) setBetAmount(0);
    }, [betAmount])
    const snpPeppers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const options = snpPeppers.map((e) => { return { value: e, label: e } });
    const submitBet = () => {

    }
    const resetBoxes = () =>
    {
        setBoxes(snpColumns.map((e) => {return (
            {
                id: e,
                isSalt:false,
                isPepper:false,
                canBeClicked:true
        });}));
    }
    const pickItem = (id) => {
        // if(!isPlaying) return;
        var tempBox = boxes;
        boxes[id].isSalt = true;
        setBoxes([]);
        setBoxes(tempBox);

        console.log(boxes)
    }
    const cashOut = () => {

    }
    return (
        <div className="snp-body">
            <form onSubmit={submitBet}>
                <div className='game-input-wrapper'>
                    <label className='game-input'>
                        <p>Bet: </p>
                        <input type="number" onChange={(e) => setBetAmount(Math.ceil(e.target.valueAsNumber))} placeholder="0" value={betAmount} />
                        <button onClick={() => setBetAmount(Math.ceil(betAmount / 2))} type="button" >1/2 x</button>
                        <button onClick={() => setBetAmount(betAmount * 2)} type="button">2 x</button>
                    </label>
                    <br />
                </div>
                <div className='game-input-wrapper'>
                    <label className='game-input'>
                        <select name='pepper' id="pepper" >
                            {
                                options.map((e) => {
                                    return (
                                        <option className='dropdown-item' value={e.value}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                        Peppers
                        <p>2X</p>
                    </label>
                </div>
                <div className="snp-grid">
                    {boxes.map((e, key) => (
                        <SNPBox key={key} isPlaying={isPlaying} id={e.id} isPepper={e.isPepper} isSalt={e.isSalt} canBeClicked={e.canBeClicked} onClickFunction={pickItem} />
                    ))}
                </div>
                <button type="submit" className='snp-play__button'>Bet & Play</button>
            </form>
        </div>
    );
}

export default SaltandPepper;
