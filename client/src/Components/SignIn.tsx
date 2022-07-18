import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import '../Styles/SignUp.css';
import { MdEmail, MdLock } from "react-icons/md";
import { FaApple, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsArrowLeft } from "react-icons/bs";
import { stringify } from 'querystring';

interface User {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
  }
interface Errors {
    Password: string | undefined,
    Username: string | undefined,
    Email: string | undefined
}
interface Props {
    updateUser: (user:User) => void;
  }
function SignIn({updateUser}:Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [usernameText, setUsernameText] = useState('');
    const [error, setError] = useState<Errors>({ Password: "", Username: "", Email: "" });
   
    const navigate = useNavigate();
    const navigteToSignUp = () => {
        navigate('/salt-venture/SignUp');
    };
    const sendSignIn = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        setError({ Password: undefined, Username: undefined, Email: undefined })

        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            Password: e.target["password"].value,
            Email: e.target["email"].value
        })
        console.log(body)
        const requestSettings = {
            method: 'POST',
            headers: myHeaders,
            body: body,
        };

        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/users/login", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            console.log(deserializedJSON);
            updateUser(deserializedJSON);
            navigate('/salt-venture/');
        } catch (err) {
            let errors = JSON.parse(err.message);
            if (errors.status == undefined) {
                setError({ Password: errors.Password, Username: errors.Username, Email: errors.Email })
            }
            else {
                errors = errors.errors;
                console.log(errors)
                setError({ Password: errors.Password[0], Username: undefined, Email: errors.Email[0] })

            }
        }

        // setEmailText('');
        // setPasswordText('');
        // setUsernameText('');
    }

    return (
        <div className="sign-up">
            <div className="sign-up__header">
                {/* <Link to="/signin"> <BsArrowLeft className='sign-up__back-btn' /> </Link> */}
                <BsArrowLeft className='sign-up__back-btn' onClick={navigteToSignUp} />
                <h2>Log In</h2>
            </div>
            <h1 className='create-account'>Welcome<br />Back</h1>
            <form onSubmit={sendSignIn}>
                <label htmlFor="email" className='sign-up__label'>Email
                    <div className={"input-wrapper " + (error.Email !== "" && error.Email !== undefined ? "error__input" : "")}>
                        <MdEmail />
                        <input onChange={(e) => { setEmailText(e.target.value) }} value={emailText} placeholder='example@appliedtechnology.se' type="text" name='email' id='email' required />
                    </div>
                    <p className='error__msg'> {error.Email}</p>
                </label>
                <label htmlFor="password" className='sign-up__label'>Password
                    <div className={"input-wrapper " + (error.Password !== "" && error.Password !== undefined ? "error__input" : "")}>
                        <MdLock />
                        <input onChange={(e) => { setPasswordText(e.target.value) }} value={passwordText} placeholder='Password' type="password" name='password' id='password' required />
                    </div>
                    <p className='error__msg'> {error.Password}</p>
                </label>
                <button className='sign-up__button' >Log In</button>
            </form>
            <div className="divisor">
                <div className='d-right'><hr />  </div>
                <div className="d-or">or</div>
                <div className='d-left'><hr /></div>
            </div>
            <div className='sign-up__third-parties'>
                <button className='sign-up__third-party'>
                    <FcGoogle /> Log In with Google
                </button>
                <button className='sign-up__third-party'>
                    <FaApple /> Log In with Apple
                </button>
            </div>
        </div>
    );
}

export default SignIn;
