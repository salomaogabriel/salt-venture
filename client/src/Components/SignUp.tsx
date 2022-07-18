import React from 'react';
import '../Styles/SignUp.css';
import { MdEmail, MdLock } from "react-icons/md";
import { FaApple, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsArrowLeft } from "react-icons/bs";
import { useState } from 'react';

function SignUp() {

    return (
        <div className="sign-up">
            <div className="sign-up__header">
                <BsArrowLeft className='sign-up__back-btn' />
                <h2>Sign up</h2>
            </div>
            <h1 className='create-account'>Create<br />Account</h1>
            <form>
                <label htmlFor="email" className='sign-up__label'>Email
                    <div className="input-wrapper error__input">
                        <MdEmail />
                        <input type="text" name='email' id='email' placeholder='example@appliedtechnology.se' />
                    </div>
                    <p className='error__msg'>Error Message</p>
                </label>
                <label htmlFor="username" className='sign-up__label'>Username
                    <div className="input-wrapper">
                        <FaUserAlt />
                        <input type="text" name='username' id='username' placeholder='username1234' />
                    </div>
                    <p className='error__msg'></p>

                </label>
                <label htmlFor="password" className='sign-up__label'>Password
                    <div className="input-wrapper">
                        <MdLock />
                        <input type="password" name='password' id='password' placeholder='Password' />
                    </div>
                    <p className='error__msg'></p>

                </label>
                <button className='sign-up__button'>Sign Up</button>
            </form>
            <div className="divisor">
                <div className='d-right'><hr />  </div>
                <div className="d-or">or</div>
                <div className='d-left'><hr /></div>
            </div>
            <div className='sign-up__third-parties'>
                <button className='sign-up__third-party'>
                    <FcGoogle /> Sign up with Google
                </button>
                <button className='sign-up__third-party'>
                    <FaApple /> Sign up with Google
                </button>
            </div>
        </div>
    );
}

export default SignUp;
