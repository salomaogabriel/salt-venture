import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Header from './Header';

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    }
}

interface userData {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined
}

function Profile({ user }: Props) {

    const { id } = useParams();
    const [userData, setUserData] = useState<userData>({ id: undefined, email: undefined, username: undefined, balance: undefined });
    const searchUser = async () => {
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {


            const response = await fetch(`https://saltventure.azurewebsites.net/api/users/${id}`, requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            console.log(await response.json());
            // const deserializedJSON = await response.json();
            // console.log(deserializedJSON);
            // setUserData(deserializedJSON);
        }
        catch (err) {
            console.log(err);
        }

    }
    if (user.id == undefined) {
        return (
            <>
                You need to be logged in!
            </>
        );
    }
    return (
        <div>
            <div>
                <Header user={user} />
            </div>
            <div>
                <div>
                    Hello {userData.email}
                    {userData.username}
                    {userData.balance}
                </div>
                <button onClick={searchUser}>Search User</button>
            </div>
        </div>
    );
}

export default Profile;
