import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import '../Styles/SignUp.css';

interface Props {
    logout: () => void;
}
function SignUpConfirmation({ logOut }) {
    const navigate = useNavigate();
    const navigateToLogIn = () => {
        navigate('/salt-venture/');
    }
    return (
        <>
            <div className="sign-up confirmation--signup">
                <div className="sign-up__header">
                </div>
                <p className="confirmation-message">Successfully Created An Account,</p>
                <p>You are now signed in!</p>
                <button className="sign-in__button--confirmation" onClick={navigateToLogIn}>Back to Home </button>
                <p className='sign-up__link'><Link to="/salt-venture/" onClick={logOut}>Log out</Link></p>
                <p className='almost-hidden'>*Disclaimer: By using our website, you give us permission to use your game data and share it with """absolutely legal""" gambling companies</p>
            </div>
        </>
    );
}

export default SignUpConfirmation;
