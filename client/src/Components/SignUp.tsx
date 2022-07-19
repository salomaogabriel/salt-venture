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
function SignUp({updateUser}:Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [usernameText, setUsernameText] = useState('');
    const [error, setError] = useState<Errors>({ Password: "", Username: "", Email: "" });
   
    const navigate = useNavigate();
    const navigteToSignIn = () => {
        navigate('/salt-venture/');
    };
    const sendSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        var myHeaders = new Headers();
        setError({ Password: undefined, Username: undefined, Email: undefined })

        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            Password: e.target["password"].value,
            Username: e.target["username"].value,
            Email: e.target["email"].value
        })
        console.log(body)
        const requestSettings = {
            method: 'POST',
            headers: myHeaders,
            body: body,
        };

        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/users", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            console.log(deserializedJSON);
            updateUser(deserializedJSON);
        setIsLoading(false);

            navigate('/salt-venture/');
        } catch (err) {
            let errors = JSON.parse(err.message);
            if (errors.status == undefined) {
                setError({ Password: errors.Password, Username: errors.Username, Email: errors.Email })
            }
            else {
                errors = errors.errors;
                let passwordError = errors.Password ? errors.Password[0] : "";
                let emailError = errors.Email ? errors.Email[0] : "";
                let usernameError = errors.Username ? errors.Username[0] : "";
                setError({ Password: passwordError, Username: usernameError, Email: emailError })

            }
        setIsLoading(false);

        }

        // setEmailText('');
        // setPasswordText('');
        // setUsernameText('');
    }

    return (
        <div className="sign-up">
            <div className="sign-up__header">
                {/* <Link to="/signin"> <BsArrowLeft className='sign-up__back-btn' /> </Link> */}
                <BsArrowLeft className='sign-up__back-btn' onClick={navigteToSignIn} />
                <h2>Sign Up</h2>
            </div>
            <h1 className='create-account'>Create<br />Account</h1>
            <form onSubmit={sendSignUp}>
                <label htmlFor="email" className='sign-up__label'>Email
                    <div className={"input-wrapper " + (error.Email !== "" && error.Email !== undefined ? "error__input" : "")}>
                        <MdEmail />
                        <input onChange={(e) => { setEmailText(e.target.value) }} value={emailText} placeholder='example@appliedtechnology.se' type="text" name='email' id='email' required />
                    </div>
                    <p className='error__msg'> {error.Email}</p>
                </label>
                <label htmlFor="username" className='sign-up__label'>Username
                    <div className={"input-wrapper " + (error.Username !== "" && error.Username !== undefined ? "error__input" : "")}>
                        <FaUserAlt />
                        <input onChange={(e) => { setUsernameText(e.target.value) }} value={usernameText} placeholder='Username' type="text" name='username' id='username' required />
                    </div>

                    <p className='error__msg'> {error.Username}</p>
                </label>
                <label htmlFor="password" className='sign-up__label'>Password
                    <div className={"input-wrapper " + (error.Password !== "" && error.Password !== undefined ? "error__input" : "")}>
                        <MdLock />
                        <input onChange={(e) => { setPasswordText(e.target.value) }} value={passwordText} placeholder='Password' type="password" name='password' id='password' required />
                    </div>
                    <p className='error__msg'> {error.Password}</p>
                </label>
                <button className='sign-up__button' >{
                    !isLoading ?
                    <>Sig Up</>
                    :
                    <div className="wave-animation">
                            <div className="wave" style={{"--w":"0s"} as React.CSSProperties } ></div>
                            <div className="wave" style={{"--w":"0.4s"} as React.CSSProperties }></div>
                            <div className="wave" style={{"--w":"0.8s"} as React.CSSProperties }></div>
                            <div className="wave" style={{"--w":"1.2s"} as React.CSSProperties }></div>
                        </div>
                }</button>
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
                    <FaApple /> Sign up with Apple
                </button>
            </div>
            <p className='sign-up__link'>Already have an account? <Link to="/salt-venture/login">Sign In!</Link></p>

        </div>
    );
}

export default SignUp;
