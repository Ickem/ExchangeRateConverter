import React from 'react';
import './Input.css';

export const Input = ({count,onChangeCount}) => {
    return <input
        type="text"
        className="currency"
        value={count}
        onChange={onChangeCount}
    />
};