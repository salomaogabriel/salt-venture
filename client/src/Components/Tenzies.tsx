import React, { useState, useEffect } from 'react'
import '../Styles/Tenzi.css';
import Dice from './Dice';

import { nanoid } from "nanoid"
import Confetti from "react-confetti"



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

const Tenzies = ({ user, updateUser }: Props)=> {

  const [counter, setCounter] = useState(60);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  const allNewDice = () => {

    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  const rollDice = () => {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  const getReward = async () => {
    if (user == undefined) return;
    const requestSettings = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + user.token,
            "Content-Type": "application/json"
        }
    };
    try {
        const response = await fetch("https://saltventure.azurewebsites.net/api/tenzies/getreward", requestSettings)
        if (!response.ok) {
            throw new Error(JSON.stringify(await response.json()));
        }
        const deserializedJSON = await response.json();    
        updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.user.balance, token: user.token })

    }
    catch (err) {
        console.log(err);
    }
}



  return (
    <div className='main'>
      {tenzies && <Confetti /> }
      
      <h1 className="title">&lt;/ Tenzies &gt;</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
        
      <div className="dice-container">
        {diceElements}
      </div>
      <> {tenzies && <button onClick={getReward}>Get Reward</button>}</>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  )
}
export default Tenzies