import React, { useEffect } from 'react';
import Signup from './Components/SignUp';
import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Rank from './Components/Rank';
import Header from './Components/Header';
import ProfileSettings from './Components/ProfileSettings';
import SignUpConfirmation from './Components/SignUpConfirmation';

interface User {
  id: number | undefined,
  email: string | undefined,
  username: string | undefined,
  balance: number | undefined,
  token: string | undefined,
}

function App() {
  const [user, setUser] = useState<User>({
    id: undefined,
    email: undefined,
    username: undefined,
    balance: undefined,
    token: undefined
  });
  const logOut = () => {
    setUser({
      id: undefined,
      email: undefined,
      username: undefined,
      balance: undefined,
      token: undefined
    })
    localStorage.clear();
  }
  const updateUser = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  useEffect(() => {
    let stored = localStorage.getItem('user');

    if (stored !== null) {
      setUser(JSON.parse(stored))
    }
  }, [])


  return (
    <div className="App">

      <Routes>
        <Route path="/salt-venture/SignUp" element={<></>}></Route>
        <Route path="/salt-venture/SignUp/confirmation" element={<></>}></Route>
        <Route path="/salt-venture/Login" element={<></>}></Route>
        <Route path="*" element={<Header user={user} logOut={logOut} />}></Route>
      </Routes>

{
  user.id == undefined ? 
  <Routes>
  <Route path="/salt-venture/SignUp" element={<SignUp updateUser={updateUser} />}></Route>
  <Route path="/salt-venture/Login" element={<SignIn updateUser={updateUser} />}></Route>
  <Route path="/salt-venture/SignUp/Confirmation" element={<SignUpConfirmation />}></Route>
  <Route path="*" element={<Home user={user} />}></Route>
</Routes>
  :

      <Routes>
        <Route path="/salt-venture/SignUp" element={<SignUp updateUser={updateUser} />}></Route>
        <Route path="/salt-venture/Login" element={<SignIn updateUser={updateUser} />}></Route>
        <Route path="/salt-venture/profile/:id" element={<Profile user={user} />}></Route>
        <Route path="/salt-venture/profile" element={<Profile user={user} />}></Route>
        <Route path="/salt-venture/ranks" element={<Rank user={user} />}></Route>
        <Route path="/salt-venture/profile/edit" element={<ProfileSettings user={user} logOut={logOut} />}></Route>
        <Route path="/salt-venture/SignUp/Confirmation" element={<SignUpConfirmation />}></Route>
        <Route path="*" element={<Home user={user} />}></Route>
      </Routes>
}
    </div>
  );
}

export default App;
