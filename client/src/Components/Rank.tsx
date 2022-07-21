import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import '../Styles/Rank.css'
import { FaUserAlt } from 'react-icons/fa';
import { TbSalt } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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
    username: string | undefined,
    balance: number | undefined,
}

function Rank({ user }: Props) {
    const [data, setData] = useState<Array<userData | undefined>>([]);
    const getUsers = async (usernameLike?) => {
        if (user.id == undefined) return;
        const requestSettings = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        let url = usernameLike == undefined || usernameLike == "" ? "" : `?username=${usernameLike}`;
        try {
            const response = await fetch(`https://saltventure.azurewebsites.net/api/users/${url}`
                , requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
            console.log(deserializedJSON)
            setData(deserializedJSON["$values"]);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUsers();
    }, [user])
    if (data.length != 0) {

        return (
            <div>
                <h1 className='rank-title'>Rankings</h1>
                <label className='search-bar-rank'>

                    <input type="search" name="search" onChange={(e) => getUsers(e.target.value)} placeholder="search user" /> <AiOutlineSearch />
                </label>
                <hr className='rank-title-divider' />
                <div className='rank-list'>
                    {data.map((user) => {
                        return (
                            <>
                                <Link className='rank-list-item' to={`/salt-venture/profile/${user.id}`}>
                                    <FaUserAlt className='rank-list-item-img' />
                                    <div className="rank-list-item-info">
                                        <p className='rank-list-item__username'>{user.username}</p>

                                        <p className='rank-list-item__balance'><TbSalt className='salt-shaker' /> {user.balance}</p>
                                    </div>
                                </Link>
                                <hr className='rank-divider' />
                            </>
                        );
                    })}
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1 className='rank-title'>Rankings</h1>
            <label className='search-bar-rank'>
                <input type="search" name="search" onChange={(e) => getUsers(e.target.value)} placeholder="search user" /> <AiOutlineSearch />
            </label>
            <hr className='rank-title-divider' />
            <div className='rank-list'>
                <div className='rank-list-item'>
                    <div className="no-user">No User Found |</div>
                </div>
            </div>
        </div>
    )
}

export default Rank;
