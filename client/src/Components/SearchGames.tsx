import React, { ChangeEventHandler } from 'react';
import { useState } from 'react';

interface Props {
    value: string,
    handleChange: (e:any) => void
}
function SearchGames({
    value, handleChange
}:Props) {
    return (
        <div>
            <input type="text" onChange={handleChange} value={value} placeholder="enter your search" />
        </div>
    );
}
export default SearchGames;

