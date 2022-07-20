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
    logOut: () => void;
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

function ProfileSettings({ user, logOut }: Props) {
    const [confirmationScreen, setConfirmationScreen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { id } = useParams();

    const updateUser = async (e) => {
        e.preventDefault();
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
            const deserializedJSON = await response.json();
            if (response.ok) {
                // TODO: Display Ok Message
            }
            console.log(deserializedJSON);
        }
        catch (err) {

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
                    <form onSubmit={updateUser}>
                        <hr className='edit-divider' />
                        <label className='edit-field-wrapper'>
                            <FaUserAlt className='edit-icon' />
                            <input className='edit-field-input' type="text" placeholder={user.username} name="username" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <label className='edit-field-wrapper'>
                            <MdEmail className='edit-icon' />
                            <input className='edit-field-input' type="text" placeholder={user.email} name="email" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <label className='edit-field-wrapper'>
                            <MdLock className='edit-icon' />
                            <input className='edit-field-input' type="password" placeholder="Password" name="password" /> <HiPencilAlt className="edit-icon" />
                        </label>
                        <button className="submit-edit">Submit</button>
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
