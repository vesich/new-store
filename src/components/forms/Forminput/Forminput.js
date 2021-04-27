import React, { Component } from 'react'
import './forminput.scss'

const Forminput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className='formRow'>
            {label && (
                <label>
                    {label}
                </label>
            )}

            <input className="formInput" onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default Forminput;
