import React from 'react';
import { useState } from 'react';
import '../Styles/Header.css'
import { TbSalt } from 'react-icons/tb'
import MenuBar from './MenuBar';
import { Squeeze as Hamburger } from 'hamburger-react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom';

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    }
}
function Header({ user }: Props) {
    const navigate = useNavigate();
    const navigteToSignIn = () => {
        navigate('/salt-venture/login');
    };
    return (
        <>
            <header className='main-header'>
                <Hamburger rounded color='#8C8A93' />
                <MenuBar />
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
