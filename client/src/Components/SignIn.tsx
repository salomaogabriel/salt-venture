import React, { useState, useEffect } from 'react';
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
    const [error, setError] = useState<Errors>({ Password: "", Username: "", Email: "" });
   
    useEffect(() => {
        let tmpError = error;
        tmpError.Email = "";
        setError(tmpError);
    }, [emailText]);
    useEffect(() => {
        let tmpError = error;
        tmpError.Password = "";
        setError(tmpError);
    }, [passwordText]);

    const navigate = useNavigate();
    const navigteToSignUp = () => {
        navigate('/salt-venture/');
    };
    const sendSignIn = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        var myHeaders = new Headers();
        setError({ Password: undefined, Username: undefined, Email: undefined })

        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
            Password: e.target["password"].value,
            Email: e.target["email"].value
        })
        const requestSettings = {
            method: 'POST',
            headers: myHeaders,
            body: body,
        };

        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/users/login", requestSettings)
            if(response.status == 404) 
            {
                console.log("404")
                throw new Error(undefined);
            }
            if (!response.ok) {
                console.log("not 404")
           
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
        setIsLoading(false);

            console.log(deserializedJSON);
            updateUser(deserializedJSON);
            navigate('/salt-venture/');
        } catch (err) {
            setIsLoading(false);
            if(err.message === "")
            {
                setError({ Password: "User not Found", Username: "", Email: "User not Found" })
                return;
            }

            let errors = JSON.parse(err.message);
            if (errors.status == undefined) {
                setError({ Password: errors.Password, Username: "", Email: errors.Email })
                
            }
            else {
                console.log(errors.errors)
                errors = errors.errors;
                let passwordError = errors.Password ? errors.Password[0] : "";
                let emailError = errors.Email ? errors.Email[0] : "";
                setError({ Password: passwordError, Username: "", Email: emailError })
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
            <h1 className='create-account'>Welcome<br />Back!</h1>
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
                <button className='sign-up__button' >
                {
                    !isLoading ? 
                        <>Log In</>
                    : 
                        <div className="wave-animation">
                            <div className="wave" style={{"--w":"0s"} as React.CSSProperties } ></div>
                            <div className="wave" style={{"--w":"0.4s"} as React.CSSProperties }></div>
                            <div className="wave" style={{"--w":"0.8s"} as React.CSSProperties }></div>
                            <div className="wave" style={{"--w":"1.2s"} as React.CSSProperties }></div>
                        </div>
                }
                </button>
                
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
            <p className='sign-up__link'>New Here? <Link to="/salt-venture/signup">Sign Up!</Link></p>
        </div>
    );
}

export default SignIn;
