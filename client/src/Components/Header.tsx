import React from 'react';
import { useState } from 'react';
import '../Styles/Header.css'
import { TbSalt } from 'react-icons/tb'
import { Squeeze as Hamburger } from 'hamburger-react'

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

    return (
        <>
            <header className='main-header'>
                <Hamburger rounded color='#8C8A93' />
                <div className='balance'>
                    <TbSalt className='salt-balance__icon' />
                    {user.balance}
                </div>
            </header>
        </>
    );
}

export default Header;
