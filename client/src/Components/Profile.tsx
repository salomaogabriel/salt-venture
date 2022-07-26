import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import '../Styles/Profile.css';
import { TbSalt } from 'react-icons/tb';
import { FaPencilRuler, FaUserAlt } from 'react-icons/fa';
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
            console.log(deserializedJSON.bets["$values"]);
            setUserData({
                id: deserializedJSON.id,
                username: deserializedJSON.username,
                email: deserializedJSON.email,
                balance: deserializedJSON.balance,
                bets: [...deserializedJSON.bets["$values"],{game:-1,balance:deserializedJSON.balance}]
            });
            console.log(deserializedJSON.bets["$values"].map((b, index) => b))
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
    if (userData.id == undefined)     return (<>
        <div className="profile-image loading-profile-image loading"> 
        </div>
        <div className='profile-list'>
        <p className='profile-list-item loading loading-profile-list-item' > </p>
        <p className='profile-list-item loading loading-profile-list-item' > </p>
        <p className='profile-list-item loading loading-profile-list-item'></p>

        </div>
        <hr className='rank-divider' />
        <div className="profile-graph loading loading-profile-graph"></div>
    </>);

    return (
        <div>
            <>
                {id == undefined || user.id.toString() == id ?
                    <div className='profile-edit__wrapper'>
                        <Link to="/salt-venture/profile/edit" ><FaPencilRuler
                            className="profile-edit__button" /></Link>
                    </div>
                    : <></>
                }
            </>
            <div>

                <FaUserAlt className='profile-image' />
                <h2 className='profile-user'> &lt;/ {userData.username} &gt;</h2>
                <div className='profile-list'>
                    <p className='profile-list-item'>{userData.email} </p>
                    <p className='profile-list-item'>Current Points: <TbSalt className="profile-balance-icon salt-shaker" />{userData.balance}</p>
                </div>
            </div>
            <hr className='rank-divider' />

            <div className='chart-title'>Points Over Time:</div>
            <Chart labels={userData.bets.map((b, index) => index)} data={userData.bets.map((b) => b.balance)} label={"Salt Points"} color={"EA4545"} />
            {/* <hr className='rank-divider' />
            <div className='chart-title'>Points when playing Salt & Pepper:</div>

            <Chart labels=
            {userData.bets.filter(b =>b.game == 0 || b.game == -1 ).map((b,index) => index)}
             data={userData.bets.filter(b => b.game == 0 || b.game == -1 ).map((b,index) =>  b.balance)}
              label={"$ Salties"} color={"EA4545"} />
              <hr className='rank-divider' />
            <div className='chart-title'>Points when playing Dragon Tower:</div>

            <Chart labels=
            {userData.bets.filter(b =>b.game == 1  || b.game == -1 ).map((b,index) => index)}
             data={userData.bets.filter(b => b.game == 1 || b.game == -1 ).map((b,index) =>  b.balance)}
              label={"$ Salties"} color={"EA4545"} /> */}
        </div>
    );
}

export default Profile;
