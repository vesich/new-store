import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './emailpassword.scss';
import { withRouter } from 'react-router-dom'
import { resetPassword, resetAllAuthForms } from '../../redux/user/user.actions'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});

const EmailPassword = (props) => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms())
            props.history.push('/');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ email }))

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

export default withRouter(EmailPassword)
