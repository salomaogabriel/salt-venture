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
    id: number,
    isSalt: boolean,
    isPepper: boolean,
    canBeClicked: boolean,
    isUpdated: number,
}
interface Boxes {
    boxesList: Array<Box>,
    changes: number
}
function SaltandPepper({ user, updateUser }: Props) {


    const snpPeppers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const options = snpPeppers.map((e) => { return { value: e, label: e } });
    const [betAmount, setBetAmount] = useState(0);
    const [peppers, setPeppers] = useState("1");
    const snpColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const [boxesHtml, setBoxesHtml] = useState<any>(<></>);
    const initialBoxes = snpColumns.map((e) => {
        return (
            {
                id: e,
                isSalt: false,
                isPepper: false,
                canBeClicked: true,
                isUpdated: 0
            });
    });
    const [boxes, setBoxes] = useState<Boxes>({ boxesList: initialBoxes, changes: 0 });
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (betAmount > user.balance) setBetAmount(user.balance);
        if (betAmount < 0) setBetAmount(0);
    }, [betAmount])

    useEffect(() => {
        checkExistingGame();
    }, [user])
    const checkExistingGame = async () => {
        if (user == undefined) return;
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/saltnpepper", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            //TODO: set current Game
            const deserializedJSON = await response.json();
            setIsPlaying(true);
            setPeppers(deserializedJSON.pepperNumbers);
            let isCompleted = deserializedJSON.isCompleted;
            let boxesFromFetch = deserializedJSON.gridResponse.split("").map((e, index) => {
                return ({
                    id: index,
                    isSalt: e == 'x',
                    isPepper: e == '1',
                    canBeClicked: e == '0' && !isCompleted,
                    isUpdated: 0
                }
                );
            })
            console.log(boxesFromFetch)
            setBoxes({ boxesList: boxesFromFetch, changes: 0 });
            console.log(deserializedJSON)
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

        }
        catch (err) {
        }
    }
    const submitBet = async (e) => {
        e.preventDefault();
        if (user == undefined) return;
        if (betAmount > user.balance) {
            //TODO: show error message
            return;
        }
        const body = JSON.stringify({
            BetAmount: betAmount,
            PepperAmount: parseInt(peppers)
        })
        console.log(body)
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            },
            body: body
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/saltnpepper", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            //TODO: set current Game
            const deserializedJSON = await response.json();
            setIsPlaying(true);
            setPeppers(deserializedJSON.pepperNumbers);
            let isCompleted = deserializedJSON.isCompleted;
            let boxesFromFetch = deserializedJSON.gridResponse.split("").map((e, index) => {
                return ({
                    id: index,
                    isSalt: e == 'x',
                    isPepper: e == '1',
                    canBeClicked: e == '0' && !isCompleted,
                    isUpdated: 0
                }
                );
            })
            console.log(deserializedJSON)
            setBoxes({ boxesList: boxesFromFetch, changes: 0 });
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

        }
        catch (err) {
            console.log(err);
        }


    }
    const resetBoxes = () => {
        setBoxes({ boxesList: initialBoxes, changes: 0 });
    }
    const pickItem = async (id) => {
        if (!isPlaying || user == undefined) return;
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/saltnpepper/pick/" + id, requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            setIsPlaying(true);
            setPeppers(deserializedJSON.pepperNumbers);
            let isCompleted = deserializedJSON.isCompleted;
            let boxesFromFetch = deserializedJSON.gridResponse.split("").map((e, index) => {
                return ({
                    id: index,
                    isSalt: e == 'x' || (isCompleted && e !== '1'),
                    isPepper: e == '1' || (isCompleted && e !== 'x' && e !== '0'),
                    canBeClicked: e == '0' && !isCompleted,
                    isUpdated: 0
                }
                );
            })
            console.log(boxesFromFetch)
            setBoxes({ boxesList: boxesFromFetch, changes: boxes.changes + 1 });
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

            if (isCompleted) {
                //TODO: Show that the player lost everything
                setIsPlaying(false);
            }
        }
        catch (err) {
            console.log(err);
        }


        // var tempBoxes = {...boxes};
        // tempBoxes.boxesList[id].isSalt = true;
        // tempBoxes.boxesList[id].isUpdated += 1;
        // tempBoxes.changes += 1;
        // setBoxes(tempBoxes);
    }
    const cashOut = async () => {
        if (user == undefined || !isPlaying) return;
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/saltnpepper/cashout", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            setIsPlaying(false);
            setPeppers(deserializedJSON.pepperNumbers);
            let isCompleted = deserializedJSON.isCompleted;
            let boxesFromFetch = deserializedJSON.gridResponse.split("").map((e, index) => {
                return ({
                    id: index,
                    isSalt: e == 'x' || (isCompleted && e !== '1'),
                    isPepper: e == '1' || (isCompleted && e !== 'x' && e !== '0'),
                    canBeClicked: e == '0' && !isCompleted,
                    isUpdated: 0
                }
                );
            })
            setBoxes({ boxesList: boxesFromFetch, changes: boxes.changes + 1 });
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.bet.user.balance, token: user.token })

        }
        catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        setBoxesHtml(boxes.boxesList.map((e, key) => (
            <SNPBox key={key} isPlaying={isPlaying} id={e.id} isPepper={e.isPepper} isSalt={e.isSalt} canBeClicked={e.canBeClicked} onClickFunction={pickItem} />
        )));
    }, [boxes])
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
                        <select name='pepper' id="pepper" onChange={(e) => {
                            setPeppers(e.target.value)
                        }}>
                            {
                                options.map((e, index) => {
                                    return (
                                        <option key={index} className='dropdown-item' value={e.value}>{e.label}</option>
                                    )
                                })
                            }
                        </select>
                        Peppers
                        <p>2X</p>
                    </label>
                </div>
                <div className="snp-grid">
                    {boxesHtml}
                </div>
                {!isPlaying ?
                    <button type="submit" className='snp-play__button'>Bet & Play</button>
                    :
                    <button type="button" className='snp-play__button' onClick={cashOut}>Cashout</button>

                }
            </form>
        </div>
    );
}

export default SaltandPepper;
