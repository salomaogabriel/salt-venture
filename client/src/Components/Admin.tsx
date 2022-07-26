import React, { useEffect, useState } from 'react';
import '../Styles/admin.css'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { TbSalt } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { AmdDependency } from 'typescript';
import SaltnPepper from '../Assets/salt&pepper.png';
import { AiOutlineSearch } from 'react-icons/ai';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    },
    logout: () => void;

}
function Admin({ user, logout }: Props) {
    const [isSeeingUser, setIsSeeingUser] = useState(false);
    const [searchingId, setSearchingId] = useState(0);
    const [data, setData] = useState<any>([]);
    const [labels, setLabels] = useState<any>([]);
    const [chartData, setChartData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>();
    const viewUser = async (id) => {
        setIsLoading(true);
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
            const deserializedJSON = await response.json();
            console.log(deserializedJSON.bets["$values"]);
            setUserData({
                id: deserializedJSON.id,
                username: deserializedJSON.username,
                email: deserializedJSON.email,
                balance: deserializedJSON.balance,
                bets: [...deserializedJSON.bets["$values"]]
            });
            setIsSeeingUser(true);

            setIsLoading(false);

        }
        catch (err) {
            setIsSeeingUser(true);

            setIsLoading(false);
            console.log(err);
        }
    }
    const deleteUser = async (id) => {
        const requestSettings = {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/admin/delete/" + id

                , requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            getUsers();
        }
        catch (err) {
            console.log(err);
        }
    }
    const getUsers = async () => {
        setIsLoading(true);
        if (user.id == undefined) return;
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/admin/"
                , requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();

            // deserializedJSON.usersMoneyRange
            let tempData = [];
            let templabels = [];
            let curLabel = 0;
            let objAsArr = Object.entries(deserializedJSON.usersMoneyRange);
            console.log(objAsArr)
            for (const [key, value] of objAsArr) {
                if (key == "$id") continue;

                while (curLabel < parseInt(key)) {
                    curLabel += 100;
                    templabels.push(curLabel);
                    tempData.push(0);
                }
                templabels.push(key);
                tempData.push(value);
            }

            setIsLoading(false);
            setLabels(templabels)
            setChartData(tempData);
            setData(deserializedJSON);
            console.log(deserializedJSON);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUsers();
    }, [user])
    if (isLoading) {
        return (<>Loading</>)
    }
    const dataChart = {
        labels,
        datasets: [
            {
                label: 'Number of Users',
                data: chartData,
                backgroundColor: '#EA4545',
                stack: 'Stack 0',
            }
        ]
    }

    return (
        <>
            <div className='admin-page'>

                <header className='admin-header'>
                    <BiLogOut className='admin-button' onClick={logout} />
                    <h1>Admin Page</h1>
                </header>

                <div className="admin-info-row">
                    <h2>Salties Made: <br /> {data.houseWinnings}</h2>
                    <h2>Bets Made: <br /> {data.betsMade}</h2>
                    <h2>Total Users: <br /> {data.usersNo}</h2>
                    <h2>Active: <br /> {data.activeUsersNo}</h2>
                </div>
                <div className="admin-info-graph">
                    <Bar data={dataChart} />
                </div>
                <div className="admin-fraudulent-list">
                    <h2>Possible Frauds ({data.possibleFraudulentUSers["$values"].length}):</h2>
                    {data.possibleFraudulentUSers ? <>
                        {data.possibleFraudulentUSers["$values"].map((e) => {
                            return (<> <div className='admin-list-item'>
                                <div className="admin-list-item-info">
                                    <FaUserAlt className='rank-list-item-img' />
                                    <div className="rank-list-item-info">
                                        <p className='rank-list-item__username'>{e.username}</p>

                                        <p className='rank-list-item__balance'><TbSalt className='salt-shaker' /> {e.balance}</p>
                                    </div>
                                </div>
                                <div className="admin-list-item-buttons">
                                    <button className='admin-list-item-button' onClick={(ev) => { ev.preventDefault(); viewUser(e.id); }}>View</button>
                                    <button className='admin-list-item-buttons--delete' onClick={() => deleteUser(e.id)}>Delete</button>
                                </div>
                            </div>
                                <hr className='rank-divider' /></>);
                        })}
                    </> : <>No users found!</>}
                </div>
            </div>
            {
                isSeeingUser && !isLoading ? <>
                    <div className="full-screen-cover" onClick={() => setIsSeeingUser(false)}></div>
                    <div className="admin-popup">
                    <label className='search-bar-rank'>
                <input type="number" name="search" onChange={(e) => {setSearchingId(parseInt(e.target.value))}} placeholder="Get User By Id" />
                 <AiOutlineSearch onClick={() => viewUser(searchingId)} />
            </label>
                        <div className="admin-popup-info">
                            <h2>{userData.username}</h2>
                            <h2 className='admin-currency'><TbSalt className='salt-balance__icon salt-shaker' />{userData.balance}</h2>
                        </div>
                        <hr className='rank-divider' />
                        <h3>Bets</h3>
                        <div className="admin-bet-list">
                            {userData.bets.map((b) => {
                                let multiplierClass = "";
                                if (b.multiplier < 1) multiplierClass = "multiplier-red"
                                if (b.multiplier > 2) multiplierClass = "multiplier-green"
                                    return (<div className='admin-bet-list-item'>
                                        <img src={b.game == 0 ? SaltnPepper : "https://mediumrare.imgix.net/2c3e16f0a3b8cd8d979265e48dd6a169937a4a4d0acb05ad532ca8345a1e6f21?q=85"} alt="Game" className='admin-bet-list-item__img' />
                                        <p className="admin-list-item-amount-info">
                                            {b.amount} x <span className={`admin-multiplier-span ${multiplierClass}`}>{b.multiplier}</span>
                                        </p>
                                    </div>)
                            })}

                        </div>
                        <button className='admin-bet-list--delete' onClick={() => deleteUser(userData.id)}>Delete</button>

                    </div>
                </> : <></>
            }

        </>
    );
}

export default Admin;
