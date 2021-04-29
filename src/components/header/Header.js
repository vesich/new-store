import React from 'react';
import Logo from './../../assets/logow.png'
import './header.scss';
import { Link } from 'react-router-dom';
import { signOutUserStart } from '../../redux/user/user.actions'
import { useSelector, useDispatch } from 'react-redux'


const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Header = (props) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState)
    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <header className='header'>
            <div className="wrap">
                <div className='logo'>
                    <Link to='/'>
                        <img src={Logo} alt='just logo' />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    My Profile
                            </Link>
                            </li>
                            <li>
                                <span onClick={() => signOut()}>
                                    Logout
                              </span>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/register">
                                    Register
                            </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                            </Link>
                            </li>
                        </ul>
                    )}

                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
};


export default Header;
