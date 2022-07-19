import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import '../Styles/Profile.css';
import { TbSalt } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import Chart from './Chart';

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
    balance: number | undefined,
    bets: any | undefined
}

function Profile({ user }: Props) {

    const { id } = useParams();
    useEffect(() => {
        searchUser();
    }, [user])

    const [userData, setUserData] = useState<userData>({ id: undefined, email: undefined, username: undefined, balance: undefined, bets: undefined });
    const searchUser = async () => {
        let idToSearch = id;
        if (user.id == undefined) return;
        if (idToSearch == undefined) {
            idToSearch = user.id.toString();
        }
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch(`https://saltventure.azurewebsites.net/api/users/${idToSearch}`, requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            console.log(deserializedJSON);
            setUserData({
                id: deserializedJSON.id,
                username: deserializedJSON.username,
                email: deserializedJSON.email,
                balance: deserializedJSON.balance,
                bets: deserializedJSON.bets
            });
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
                <FaUserAlt className='profile-image' />
                <h2 className='profile-user'>{userData.username}</h2>
                <div className='profile-list'>
                    <p className='profile-list-item'>{userData.email} </p>
                    <p className='profile-list-item'>Current Balance: <TbSalt className="profile-balance-icon"/>{userData.balance}</p>
                </div>
            </div>
            <hr className='rank-divider'/>

            <div className='chart-title'>Balance Over Time:</div>
            <Chart labels={[1,2,3,4,5,6,7,8,9,10]} data={[1000,800,780,480,200,350,700,809,9,1500]} label={"$ Salties"} color={"EA4545"}  />
            <hr className='rank-divider'/>
            <div className='chart-title'>Profit on Mines:</div>

            <Chart labels={[1,2,3,4,5,6,7,8,9,10]} data={[1000,800,780,480,200,350,700,809,9,1500]} label={"$ Salties"} color={"EA4545"} />
        </div>
    );
}

export default Profile;
