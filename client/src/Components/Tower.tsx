import React, { useEffect, useState } from 'react';
import '../Styles/Tower.css';

import Confetti from "react-confetti"
import TowerBox from './TowerBox';


interface Props {
    user: User,
    updateUser: (user: User) => void;

}
interface User {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
}
interface Level {
    value: number,
    label: string,
    squares: number,
}
interface Floor {
    floorNum: number,
    boxes: Array<Box | undefined>
}
interface Box {
    id: number,
    isEmpty: boolean,
    isEgg: boolean,
    HasBeenSeen: boolean,
    canBeClicked: boolean
}
interface Tower {
    currentFloor: number,
    floors: Array<Floor>
}
function mapBoxes(arr)
{
    return arr.map((e) => { return({id:e,isEmpty:false, isEgg:false, HasBeenSeen:false,canBeClicked:true})});
}
function Tower({ user, updateUser }: Props) {
    const empty = [1,2,3,4,5,6,7,8,9];
    const [currentMultiplier, setMultiplier] = useState(0);

    const [isWin, setIsWin] = useState(false);

    let boxes = [0,1,2,3];
    let emptyBoxes = mapBoxes(boxes);
    let emptyFloors : Array<Floor> = empty.map((e,index) => 
    {
        return ({floorNum:e,boxes:emptyBoxes});
    }
    
)

    const [tower, setTower] = useState<Tower>({
        currentFloor: 0,
        floors: emptyFloors
    });
    const [level, setLevel] = useState('0');
    const [betAmount, setBetAmount] = useState(0);
    const levels: Array<Level | undefined> = [
        { value: 0, label: "Easy", squares: 4 },
        { value: 1, label: "Medium", squares: 3 },
        { value: 2, label: "Hard", squares: 2 },
        { value: 3, label: "Master", squares: 3 },
        { value: 4, label: "Expert", squares: 4 },
    ];
    const [isPlaying, setIsPlaying] = useState(false);
    const [towerHtml, setTowerHtml] = useState<any>(<></>);
    useEffect(() => {
        const squareNo = levels[parseInt(level)].squares
        boxes = Array.from(Array(squareNo).keys())
        emptyFloors = empty.map((e,index) => 
        {
            return ({floorNum:e,boxes:mapBoxes(boxes)});
        })
        setTower({currentFloor:0, floors:emptyFloors});
        
    }, [level])
    const pickItem = async (id, floor) => {
        if(!isPlaying) return;
        if(tower.currentFloor != floor -1 ) return;

        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/tower/pick/"+id, requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            const grid = deserializedJSON.gridResponse.split("");
            setIsPlaying(true);
            const squareNo = levels[parseInt(level)].squares
            boxes = Array.from(Array(squareNo).keys())
            let floors : Array<Floor | undefined> = [];
            let curFloor : Floor= {floorNum: 1, boxes:[]};
            let floorNum = 1;
            let curBox : Box;
            for (let i = 0; i < grid.length; i++) {
                curBox = {
                    id: i % 4,
                    isEmpty: grid[i] == '0',
                    isEgg: grid[i] == '1' || grid[i] == 'x',
                    HasBeenSeen: grid[i] == 'x',
                    canBeClicked: grid[i] == '2'

                }
                curFloor.boxes.push(curBox);
                if((i + 1) % squareNo== 0) 
                {
                    floorNum++;
                    floors.push(curFloor);
                    curFloor = {floorNum: floorNum, boxes:[]};
                }
            }
            if(deserializedJSON.isCompleted)
            {
                setIsPlaying(false);
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

            }
            setMultiplier(deserializedJSON.bet.multiplier);

            console.log(deserializedJSON)
            setTower({currentFloor:deserializedJSON.floor, floors:floors});
           

        }
        catch (err) {
        }
    }
    useEffect(() => {
        setTowerHtml(tower.floors.map((e,index) => {
            return(
            <div className={`tower-floor ${tower.currentFloor  == e.floorNum - 1 && isPlaying? 'tower-current' : ''} tower-floor--${level}`}>
                {e.boxes.map((b,index) => {
                    return(<TowerBox isPlaying={isPlaying} id={b.id}
                         isEmpty={b.isEmpty} isEgg={b.isEgg} 
                         HasBeenSeen={b.HasBeenSeen} canBeClicked={b.canBeClicked} 
                         onClickFunction={pickItem} 
                         floor={e.floorNum}/>)
                })}
            </div>
            );
        }))
    },[tower])
    useEffect(() => {
        if (betAmount > user.balance) setBetAmount(user.balance);
        if (betAmount < 0) setBetAmount(0);
    }, [betAmount])
    const checkExistingGame = async ()=> {
        if (user == undefined) return;
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/tower", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            //TODO: set current Game
            const deserializedJSON = await response.json();
            console.log(deserializedJSON)
            const grid = deserializedJSON.gridResponse.split("");

            setMultiplier(deserializedJSON.bet.multiplier);
            setIsPlaying(true);
            const squareNo = levels[parseInt(level)].squares
            boxes = Array.from(Array(squareNo).keys())
            let floors : Array<Floor | undefined> = [];
            let curFloor : Floor= {floorNum: 1, boxes:[]};
            let floorNum = 1;
            let curBox : Box;
            for (let i = 0; i < grid.length; i++) {
                curBox = {
                    id: i % 4,
                    isEmpty: grid[i] == '0',
                    isEgg: grid[i] == '1' || grid[i] == 'x',
                    HasBeenSeen: grid[i] == 'x',
                    canBeClicked: grid[i] == '2'

                }
                curFloor.boxes.push(curBox);
                if((i + 1) % squareNo== 0) 
                {
                    floorNum++;
                    floors.push(curFloor);
                    curFloor = {floorNum: floorNum, boxes:[]};
                }
            }
           
            setTower({currentFloor:deserializedJSON.floor, floors:floors});
           

        }
        catch (err) {
        }
    }
    useEffect(() => {
        checkExistingGame();
    },[user])
    const submitBet = async (e) =>
    {
        e.preventDefault();
        if (user == undefined) return;
        if (betAmount > user.balance) {
            //TODO: show error message
            return;
        }
        const body = JSON.stringify({
            BetAmount: betAmount,
            Level: parseInt(level)
        })
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            },
            body: body

        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/tower", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            //TODO: set current Game
            const deserializedJSON = await response.json();
            const grid = deserializedJSON.gridResponse.split("");
            setIsPlaying(true);
            setMultiplier(1);
            const squareNo = levels[parseInt(level)].squares
            boxes = Array.from(Array(squareNo).keys())
            let floors : Array<Floor | undefined> = [];
            let curFloor : Floor= {floorNum: 1, boxes:[]};
            let floorNum = 1;
            let curBox : Box;
            for (let i = 0; i < grid.length; i++) {
                curBox = {
                    id: i % 4,
                    isEmpty: grid[i] == '0',
                    isEgg: grid[i] == '1' || grid[i] == 'x',
                    HasBeenSeen: grid[i] == 'x',
                    canBeClicked: grid[i] == '2'

                }
                curFloor.boxes.push(curBox);
                if((i + 1) % squareNo== 0) 
                {
                    floorNum++;
                    floors.push(curFloor);
                    curFloor = {floorNum: floorNum, boxes:[]};
                }
            }
            setTower({currentFloor:0, floors:floors});
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

        }
        catch (err) {
        }
    }
    const cashOut = async() => {
        if(!isPlaying || user.id == undefined) return;
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/tower/cashout", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            setIsWin(true);
            setTimeout(() => {
                setIsWin(false);

            }, 8000)
            //TODO: set current Game
            const deserializedJSON = await response.json();
            const grid = deserializedJSON.gridResponse.split("");
            setIsPlaying(false);
            setMultiplier(1);

            const squareNo = levels[parseInt(level)].squares
            boxes = Array.from(Array(squareNo).keys())
            let floors : Array<Floor | undefined> = [];
            let curFloor : Floor= {floorNum: 1, boxes:[]};
            let floorNum = 1;
            let curBox : Box;
            for (let i = 0; i < grid.length; i++) {
                curBox = {
                    id: i % 4,
                    isEmpty: grid[i] == '0',
                    isEgg: grid[i] == '1' || grid[i] == 'x',
                    HasBeenSeen: grid[i] == 'x',
                    canBeClicked: grid[i] == '2'

                }
                curFloor.boxes.push(curBox);
                if((i + 1) % squareNo== 0) 
                {
                    floorNum++;
                    floors.push(curFloor);
                    curFloor = {floorNum: floorNum, boxes:[]};
                }
            }
           
            setTower({currentFloor:deserializedJSON.floor, floors:floors});
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })
           

        }
        catch (err) {
        }
    }
    return (
        <form className='tower-wrapper' onSubmit={submitBet}>
             {isWin &&   <div className="confetti-wrapper"> <Confetti className='confetti-disappear' /> </div>}
             {isPlaying ?
                    <>
                        <div className="show-multiplier">
                            Bet Amount: {betAmount}
                        </div>
                        <div className="show-multiplier">
                            Return Amount: {Math.ceil(currentMultiplier * betAmount)}
                        </div>
                        <div className="show-multiplier">
                            Current Multiplier: {currentMultiplier}X
                        </div>
                    </> :
                    <>
            <div className='game-input-wrapper'>

                <label className='game-input-field'>
                    <p>Bet: </p>
                    <input className='input-box-snp' type="number" onChange={(e) => setBetAmount(Math.ceil(e.target.valueAsNumber))} placeholder="0" value={betAmount} />
                    <button className='input-button-snp' onClick={() => setBetAmount(Math.ceil(betAmount / 2))} type="button" >&#xBD;x</button>
                    <button className='input-button-snp' onClick={() => setBetAmount(betAmount * 2)} type="button">2x</button>
                </label>
                <br />
            </div>
            <div className='game-input-wrapper'>
                <label className='game-input-field'>
                    <p>Level</p>
                    <select className='input-button-snp' name='pepper' id="pepper" onChange={(e) => {
                        setLevel(e.target.value)
                    }}>
                        {
                            levels.map((e, index) => {
                                return (
                                    <option key={index} className='drop-down-item' value={e.value}>{e.label}</option>
                                )
                            })
                        }
                    </select>
                </label>
            </div>
            </>}
            <div className="tower">
               {towerHtml}
               
            </div>
            {!isPlaying ?
                    <button type="submit" className='snp-play__button'>Bet & Play</button>
                    :
                    <button type="button" className='snp-play__button' onClick={cashOut}>Cashout</button>
                }
        </form>
    );

}

export default Tower;
