import React from 'react';
import './Select.css';

export const Select = ({
        data,
        selectCurrency,
        onChangeCurrency
    }) => {
    return(
        <select value={selectCurrency} onChange={onChangeCurrency} className="select">
            {
                data instanceof Object
                ? data.map(item =>{
                    return <option key={item.Cur_ID}>
                        {item.Cur_Abbreviation}
                    </option>
                })
                : <option key={0}>{data}</option>}
        </select>
    )
};