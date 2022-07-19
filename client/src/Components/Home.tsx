import React from 'react';
import { useState } from 'react';
import '../Styles/Home.css';
import Header from './Header';
import SearchGames from './SearchGames';
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
      <Header user={user} />
      <div className='home-screen'>
        <div className='homepage-welcome-message'>
          {
            user.id !== undefined ?
              <>Hello, <span> {user.username} </span></>
              :
              <></>
          }
        </div>

        <p> What do you want to Play?</p>
        {/* <SearchGames
         value={value}
         handleChange={handleChange}
        searchList={searchList} 
        /> */}

        <button type="button" onClick={handleClick}>Search Games</button>

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
        </div>
        <div>
          <h4> Most Popular </h4>
        </div>
      </div>
    </>
  );
}

export default Home;
