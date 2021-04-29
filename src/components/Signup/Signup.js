import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signUpUserStart } from '../../redux/user/user.actions'
import './signup.scss'
import { useHistory } from 'react-router-dom'


import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErrors: user.userErrors,
});

const Signup = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { currentUser, userErrors } = useSelector(mapState)
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            reset();
            history.push('/')
        }

    }, [currentUser])

    useEffect(() => {
        if (Array.isArray(userErrors) && userErrors.length > 0) {
            setErrors(userErrors);
        }
    }, [userErrors])

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([])
    }


    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))

    }


    const configAuthWrapper = {
        headline: 'Registration'
    }

    return (
        <AuthWrapper {...configAuthWrapper} >
            <div className="formWrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}

                <form onSubmit={handleFormSubmit}>
                    <Forminput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />
                    <Forminput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Forminput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                    <Forminput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />

                    <Button type='submit'>
                        Register
                        </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default Signup;
