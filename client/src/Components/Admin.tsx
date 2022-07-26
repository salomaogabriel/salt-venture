import React, { useEffect, useState } from 'react';
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
function Admin({ user,logout }: Props) {

    const [data, setData] = useState<any>([]);
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
            console.log(deserializedJSON)
            setIsLoading(false);

            // setData(deserializedJSON["$values"]);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUsers();
    }, [user])
        return (
        <div>
            <button onClick={logout}>Log out</button>
            Admin PAge
        </div>
           );
}

export default Admin;
