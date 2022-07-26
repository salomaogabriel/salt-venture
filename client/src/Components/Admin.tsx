import React, { useEffect, useState } from 'react';

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

    const [data, setData] = useState<any>([]);
    const [labels,setLabels] = useState<any>([]);
    const [chartData, setChartData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
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
            for (const [key, value] of Object.entries(deserializedJSON.usersMoneyRange)) {
                if(key == "$id" || parseInt(key) <= 0 ) continue;
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
                label: 'Dataset 1',
                data: chartData,
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            }
        ]
    }
    
    return (
        <div className='admin-page'>
            <button onClick={logout}>Log out</button>
            <div className="admin-info-row">
                <h2>Money Made: {data.houseWinnings}</h2>
                <h2>Total Users: {data.usersNo}</h2>
                <h2>Active: {data.activeUsersNo}</h2>
            </div>
            <div className="admin-info-graph">
                <Bar data={dataChart} />
            </div>
            {data.possibleFraudulentUSers ? <></> : <></>}
        </div>
    );
}

export default Admin;
