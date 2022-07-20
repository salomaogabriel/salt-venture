import React from 'react';
import { useState, useRef } from 'react';
import '../Styles/Home.css';
import Header from './Header';
import SearchGames from './SearchGames';
import { AiOutlineSearch } from 'react-icons/ai';
import MenuBar from './MenuBar';
import MineSweeper from "../Assets/minesweeper.png"
import PageInfo from "./PageInfo";
import PageInfoContent from "./PageInfoContent";
import { Link } from 'react-router-dom';

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
        {/* <SearchGames
         value={value}
         handleChange={handleChange}
        searchList={searchList} 
        /> */}
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
          <h4> Recent Games</h4>
          <div className="games">
            <div className="game">
             
              <img className="game-img" src="https://play-lh.googleusercontent.com/S1h8A8cR9s1aLOkFwZJjPRaB4HG6DEWwEUOn_x4olAg-d45vTbt65GkJWYyozANaahM" alt="ss"
                onClick={() => {setModalOpen(true); setGameName("Mine Sweeper")}} />
              {/* <img className="game-img" src="https://play-lh.googleusercontent.com/S1h8A8cR9s1aLOkFwZJjPRaB4HG6DEWwEUOn_x4olAg-d45vTbt65GkJWYyozANaahM" alt="ss" />
              <div className="game-title">Mines</div> */}
            </div>
            <div className="game">
              {/* <PageInfo modalOpen={modalOpen} >
                <PageInfoContent setModalOpen={setModalOpen} gameName="Crash" />
              </PageInfo> */}
              <img className="game-img" src="https://img.freepik.com/premium-vector/rocket-logo-vector_57516-203.jpg" alt="ss"
                onClick={() => {setModalOpen(true); setGameName("Crash")}} />
              {/* <div className="game-title">Crash</div> */}
            </div><div className="game">
              {/* <PageInfo modalOpen={modalOpen} >
                <PageInfoContent setModalOpen={setModalOpen} gameName="4 in a row" />
              </PageInfo> */}
              <img className="game-img" src="https://play-lh.googleusercontent.com/qpXnChibl3OO3v04zhKob3p3bamQV7O-SuRxVw5Q8kAufKq7H3ARaSZ45kppMiSvhw" alt="ss"
                onClick={() => {setModalOpen(true); setGameName("4 in a row")}} />
              {/* <div className="game-title">4 in a row</div> */}
            </div>
            <div className="game">
              {/* <PageInfo modalOpen={modalOpen} >
                <PageInfoContent setModalOpen={setModalOpen} gameName={"Diamonds"} />
              </PageInfo> */}
              <img className="game-img" src="https://img.freepik.com/free-vector/diamond-cartoon-icon-illustration-wealth-object-icon-concept_138676-2583.jpg?w=2000" alt="ss"
                onClick={() => {setModalOpen(true); setGameName("Diamonds")}} />
              {/* <div className="game-title">Diamonds</div> */}
            </div><div className="game">
            
              <img className="game-img" src="https://mediumrare.imgix.net/2c3e16f0a3b8cd8d979265e48dd6a169937a4a4d0acb05ad532ca8345a1e6f21?q=85" alt="ss"
                onClick={() =>{ setModalOpen(true); setGameName("Tower")}} />
              {/* <div className="game-title">Tower</div> */}
            </div>
          </div>
        </div>
        <div>
          <h4> Most Popular </h4>
          <div className="games">
            <div className="game">
              <img className="game-img" src="https://play-lh.googleusercontent.com/S1h8A8cR9s1aLOkFwZJjPRaB4HG6DEWwEUOn_x4olAg-d45vTbt65GkJWYyozANaahM" alt="ss" />
              {/* <div className="game-title">Mines</div> */}
            </div>
          </div>
        </div>
      </div>
      <PageInfo modalOpen={modalOpen} >
                <PageInfoContent setModalOpen={setModalOpen} gameName={gameName} />
              </PageInfo>
      <div className="new-here-home">
        {user.id === undefined ?
          <p className='sign-up__link'>New Here? <Link to="/salt-venture/signup">Sign Up!</Link></p>
          :
          <></>
        }
      </div>
    </>
  );
}

export default Home;
