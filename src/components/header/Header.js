import React from 'react';
import Logo from './../../assets/logow.png'
import './header.scss';
import { Link } from 'react-router-dom';
import { signOutUserStart } from '../../redux/user/user.actions'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import { useSelector, useDispatch } from 'react-redux'


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
})

const Header = (props) => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState)
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
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/search'>
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to='/cart'>
                                Your cart ({totalNumCartItems})
                            </Link>
                        </li>

                        {currentUser && [
                            <li>
                                <Link to="/dashboard">
                                    My Profile
                            </Link>
                            </li>,
                            <li>
                                <span onClick={() => signOut()}>
                                    Logout
                              </span>
                            </li>
                        ]}

                        {!currentUser && [
                            <li>
                                <Link to="/register">
                                    Register
                            </Link>
                            </li>,
                            <li>
                                <Link to="/login">
                                    Login
                            </Link>
                            </li>
                        ]}

                    </ul>
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
};


export default Header;
