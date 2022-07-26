import React from 'react'
interface Props {
    user: {
        id: number | undefined,
        email: string | undefined,
        username: string | undefined,
        balance: number | undefined,
        token: string | undefined,
    },
    updateUser: (user: User) => void;
  
  }
  interface User {
    id: number | undefined,
    email: string | undefined,
    username: string | undefined,
    balance: number | undefined,
    token: string | undefined,
  }
function AddCoins({ user, updateUser }: Props)  {
    const cashOut = async () => {
        if (user == undefined) return;
        const requestSettings = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + user.token,
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("https://saltventure.azurewebsites.net/api/saltnpepper/cashout", requestSettings)
            if (!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            }
            const deserializedJSON = await response.json();
           
            let newBalance = user.balance + 100;
            updateUser({ id: user.id, email: user.email, username: user.username, balance: deserializedJSON.newBalance, token: user.token })
    
        }
        catch (err) {
            console.log(err);
        }
    }
    
  return (
    <div>AddCoins</div>
  )
}

export default AddCoins