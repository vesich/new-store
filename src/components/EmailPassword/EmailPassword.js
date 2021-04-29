import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './emailpassword.scss';
import { useHistory } from 'react-router-dom'
import { resetPasswordStart, resetUserState } from '../../redux/user/user.actions'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErrors: user.userErrors
});

const EmailPassword = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErrors } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState())
            history.push('/login');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(userErrors) && userErrors.length > 0) {
            setErrors(userErrors)
        }
    }, [userErrors])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }))

    }


    const configAuthWrapper = {
        headline: 'Email Password'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => <li key={index}> {err}</li>)}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                    <Forminput
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        handleChange={e => setEmail(e.target.value)}
                    />
                    <Button type='submit'>
                        Email Password
                        </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword;
