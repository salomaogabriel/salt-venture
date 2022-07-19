import React, {useState} from 'react'
import '../Styles/NavBar.css';
import Header from './Header'

const MenuBar = () => {
    const [close,setClose] = useState(false)
    const showMenuBar = setClose(!close)
  return (
    <>
    <ul>
        <li>Home</li>
        <li>Games</li>
    </ul>
    
    
    </>
  )
}

export default MenuBar