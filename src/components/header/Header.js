import React from 'react';
import Logo from './../../assets/logo.png' 
import './header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div className="wrap">
                <div className='logo'>
                    <img src={Logo} alt='just logo' />
                </div>
            </div>
        </header>
    )
}

export default Header;
