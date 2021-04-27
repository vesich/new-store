import React from 'react';
import Logo from './../../assets/logow.png'
import './header.scss';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className='header'>
            <div className="wrap">
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='just logo' />
                    </Link>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
