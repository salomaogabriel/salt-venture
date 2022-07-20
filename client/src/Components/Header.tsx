import React from 'react';
import { useState } from 'react';
import '../Styles/Header.css'
import { TbSalt } from 'react-icons/tb'
import MenuBar from './MenuBar';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    },
    logOut: () => void;

}
function Header({ user, logOut }: Props) {
    const navigate = useNavigate();
    const navigteToSignIn = () => {
        navigate('/salt-venture/login');
    };
    return (
        <>
        <header className='sec-header'></header>
            <header className='main-header'>
                <MenuBar user = {user} logOut= {logOut}/>
                <div className='balance'>
                    {user.id !== undefined ?
                        <><TbSalt className='salt-balance__icon' />
                            {user.balance}</>
                        : <button onClick={navigteToSignIn} className='header__login-btn'>Login</button>
                    }
                </div>
            </header>
        </>
    );
}

export default Header;
