import React, { useState } from 'react'
import './signup.scss'
import { withRouter } from 'react-router-dom'
import { auth, handleUserProfile } from '../../firebase/utils'

import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';


const Signup = (props) => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([])
    }


    const handleFormSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            const err = ['Passwords don\'t match!']
            setErrors(err)
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });
            reset();
            props.history.push('/');

        } catch (err) {
            // console.log(err);
        }
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

export default withRouter(Signup);
