import React from 'react';
import { useState, useRef } from 'react';
import '../Styles/Home.css';
import Header from './Header';
import SearchGames from './SearchGames';
import { AiOutlineSearch } from 'react-icons/ai';
import MenuBar from './MenuBar';
import MineSweeper from "../Assets/minesweeper.png"
import Tenzi from "../Assets/tenzi.png"
import PageInfo from "./PageInfo";
import PageInfoContent from "./PageInfoContent";
import { Link } from 'react-router-dom';
import SaltandPepper from '../Assets/salt&pepper.png'
import Logo from '../Assets/logo.png';

interface Props {
  user: {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
  }
}
function Home({ user }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setSearchValue(value);
    if (value !== '' && !searchList.includes(value)) {
      setSearchList([value, ...searchList]);
    }
    setValue('');
  };

  const handleSelect = event => {
    setValue(event.target.value);
  };
  return (
    <>
      <div className='home-screen'>
        {user.id === undefined ?
          <p className='sign-up__link'>New Here? <Link to="/salt-venture/signup">Sign Up!</Link></p>
          :
          <></>
        }
        <div className='homepage-welcome-message'>
          {
            user.id !== undefined ?
              <>Hello, &lt;/<span>{user.username}</span>&gt;
              </>
              :
              <></>
          }
        </div>

        <p className='search-games-title'> What do you want to Play?</p>
        
        <label className='search-bar-rank'>

          <input type="search" name="search" placeholder="search games" /> <AiOutlineSearch />
        </label>
        <br />
        {(searchList.length === 0)
          ? null
          : (
            <select onChange={handleSelect} value={searchList[0]}>
              {searchList.map(query => <option key={query} value={query}>{query}</option>)}
            </select>
          )}
        <div>
        <h4> Recent </h4>
          <div className="games">
            <div className="game">
              <img className="game-img" src={SaltandPepper} alt="Salt and Pepper"
                onClick={() => { setModalOpen(true); setGameName("Salt & Pepper") }} />
            </div>
            <div className="game">
              <img className="game-img" src={Tenzi} alt="ss"
                onClick={() => { setModalOpen(true); setGameName("Tenzies") }} />
            </div>
          </div>
          <h4> Most Popular</h4>
          <div className="games">
            <div className="game">
              <img className="game-img" src={SaltandPepper} alt="Salt & Pepper"
                onClick={() => { setModalOpen(true); setGameName("Salt & Pepper") }} />
            </div>
            <div className="game">
              <img className="game-img" src="https://img.freepik.com/premium-vector/rocket-logo-vector_57516-203.jpg" alt="ss"
                onClick={() => { setModalOpen(true); setGameName("Crash") }} />
            </div>
            <div className="game">
              <img className="game-img" src="https://play-lh.googleusercontent.com/qpXnChibl3OO3v04zhKob3p3bamQV7O-SuRxVw5Q8kAufKq7H3ARaSZ45kppMiSvhw" alt="ss"
                onClick={() => { setModalOpen(true); setGameName("4 in a row") }} />
            </div>
            <div className="game">
              <img className="game-img" src="https://img.freepik.com/free-vector/diamond-cartoon-icon-illustration-wealth-object-icon-concept_138676-2583.jpg?w=2000" alt="ss"
                onClick={() => { setModalOpen(true); setGameName("Diamonds") }} />
            </div>
            <div className="game">

              <img className="game-img" src="https://mediumrare.imgix.net/2c3e16f0a3b8cd8d979265e48dd6a169937a4a4d0acb05ad532ca8345a1e6f21?q=85" alt="ss"
                onClick={() => { setModalOpen(true); setGameName("Dragon Tower") }} />
            </div>
          </div>
        </div>
        <div>
         
          <h4> Free Games </h4>
          <div className="games">
            <div className="game">
              <img className="game-img" src={Tenzi} alt="ss"
                onClick={() => { setModalOpen(true); setGameName("Tenzies") }} />
            </div>
          </div>
          <p className='footer'>Created with  ❤️ by .GQN</p>
          <p className='footer'> Copyright &copy; 2022  <br /> &lt;/ Gabriel &gt;, &lt;/ Qaisar &gt;, &lt;/ Nicholas &gt;</p>
        </div>
      </div>
      <PageInfo modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <PageInfoContent setModalOpen={setModalOpen} gameName={gameName} user={user} />
      </PageInfo>
    </>
  );
}

export default Home;
