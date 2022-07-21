import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import '../Styles/Profile.css';
import { TbSalt } from 'react-icons/tb';
import { FaPencilRuler, FaUserAlt } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    },
    logOut: () => void,
    updateUser: (any) => void;
}

interface userData {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    bets: any | undefined
}
interface updateUser {
    email: string | undefined,
    username: string | undefined
}

interface Errors {
    Password: string | undefined,
    Username: string | undefined,
    Email: string | undefined
}

function ProfileSettings({ user, logOut, updateUser }: Props) {
    const [confirmationScreen, setConfirmationScreen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<Errors>({ Password: "", Username: "", Email: "" });
    const [confirmation, setConfirmation] = useState('');

    const { id } = useParams();

    const updateUserSettings = async (e) => {
        e.preventDefault();
        setError({ Password: undefined, Username: undefined, Email: undefined })
        const body = JSON.stringify({
            Username: e.target["username"].value,
            Email: e.target["email"].value,
            Password: e.target["password"].value,
        })
        console.log(body)
        const requestSettings = {
            method: 'PATCH',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            var response = await fetch("https://saltventure.azurewebsites.net/api/users/" + user.id, requestSettings);
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            if (response.ok) {
                console.log(deserializedJSON)
                updateUser({ id: deserializedJSON.id, email: deserializedJSON.email, username: deserializedJSON.username, balance: deserializedJSON.balance, token: user.token })
                setConfirmation("Successfully Updated Account!")
            }
            console.log(deserializedJSON);
        }
        catch (err) {
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

        }

    }

    const deleteUser = async () => {
        //TODO: Popup
        const requestSettings = {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        await fetch("https://saltventure.azurewebsites.net/api/users/", requestSettings);
        logOut();
    }

    // const [updatedUser, setUpdatedUser] = useState<updateUser>({email: })

    if (user.id == undefined) {
        return (
            <>
                You need to be logged in!
            </>
        );
    }
    return (
        <div>
            {confirmationScreen ?
                <>
                    <div className="full-screen-cover"></div>
                    <div className="delete-confirmation-screen">
                        <h2>Are you sure that you want to delete?</h2>
                        <div className="delete-btns">
                            <button onClick={() => setConfirmationScreen(false)} className="delete-screen-btn delete-screen-btn--cancel">Cancel</button>
                            <button onClick={deleteUser} className="delete-screen-btn">Delete</button>
                        </div>
                    </div>
                </>
                : <></>}

            <div className='profile-edit__wrapper'>
                <Link to="/salt-venture/profile/" ><FaPencilRuler
                    className="profile-edit__button--active" /></Link>
            </div>
            <></>
            <div>
                <FaUserAlt className='profile-image' />
                <h2 className='edit-profile-picture'>change profile picture</h2>
                <div className='profile-list'>
                    <form onSubmit={updateUserSettings}>
                        <hr className='edit-divider' />

                        <label className='edit-field-wrapper'>
                            <FaUserAlt className='edit-icon' />
                            <input className='edit-field-input' type="text" placeholder={user.username} name="username" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <p className='error__msg profile-error'> {error.Username}</p>

                        <label className='edit-field-wrapper'>
                            <MdEmail className='edit-icon' />
                            <input className='edit-field-input' type="email" placeholder={user.email} name="email" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <p className='error__msg profile-error'> {error.Email}</p>

                        <label className='edit-field-wrapper'>
                            <MdLock className='edit-icon' />
                            <input className='edit-field-input' type="password" placeholder="Password" name="password" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <p className='error__msg profile-error'> {error.Password}</p>

                        <button className="submit-edit">Submit</button>
                        <p className='confirmation-message'> {confirmation}</p>
                        <hr className='edit-divider' />

                    </form>
                    <button className='edit-delete' onClick={() => setConfirmationScreen(true)}>Delete Account</button>
                </div>
                {/* HiPencilAlt */}
            </div>
        </div>
    );
}

export default ProfileSettings;
