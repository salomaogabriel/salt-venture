import React, { useEffect } from 'react';
import Signup from './Components/SignUp';
import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Profile from './Components/Profile';

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
const updateUser = (user:User) =>
{
 setUser(user);
 localStorage.setItem('user', JSON.stringify(user));
}
useEffect(() => {
  let stored = localStorage.getItem('user');

  if(stored !== null)
  {
    setUser(JSON.parse(stored))
  }
}, [])


  return (
    <div className="App">
      
      <Routes> 
          <Route path="/salt-venture/SignUp" element={<SignUp updateUser = {updateUser}/>}></Route> 
          <Route path="/salt-venture/Login" element={<SignIn updateUser = {updateUser}/>}></Route> 
          <Route path="/salt-venture/profile/:id" element={<Profile user= {user}/>}></Route> 
          <Route path="/salt-venture/profile" element={<Profile user= {user}/>}></Route> 
          <Route path="*" element={<Home user={user}/>}></Route> 
        </Routes> 
    </div>
  );
}

export default App;
