import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser, signInWithGoogle, resetAllAuthForms } from '../../redux/user/user.actions'

import './signin.scss';
import AuthWrapper from '../AuthWrapper/AuthWrapper'
import Button from '../forms/Button/Button';
import Forminput from '../forms/Forminput/Forminput'

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const Signin = (props) => {
    const { signInSuccess } = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms())
            props.history.push('/')
        }
    }, [signInSuccess])

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
    }

    const handleGooglSignin = () => {
        dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <Forminput
                        type='email'
                        name='email'
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Forminput
                        type='password'
                        name='password'
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />
                    <Button type='submit'>
                        LogIn
                            </Button>
                    <div className="socialSignin">
                        <div className='row'>
                            <Button onClick={handleGooglSignin}>
                                Sign in with Google
                               </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/recovery'>Reset Password</Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )

}

export default withRouter(Signin)
