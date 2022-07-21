import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import '../Styles/SignUp.css';

function SignUpConfirmation() {
    const navigate = useNavigate();
    const navigateToLogIn = () => {
        navigate('/salt-venture/Login');
    }
    return (
        <>
            <Link to="/salt-venture/"> <BsArrowLeft className='sign-up__back-btn back-arrow-confirmation' /> </Link>
            <div className="sign-up confirmation--signup">
                <div className="sign-up__header">
                </div>
                <p className="confirmation-message">Successfully Created An Account!</p>
                <button className="sign-in__button--confirmation" onClick={navigateToLogIn}> Sign In </button>
                <p className='sign-up__link'> Back To: <Link to="/salt-venture/">Home</Link></p>
            </div>
        </>
    );
}

export default SignUpConfirmation;
