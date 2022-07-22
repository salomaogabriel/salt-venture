import React from 'react'

const Dice = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#f25e5e47" : "#2d2d2f"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
export default Dice