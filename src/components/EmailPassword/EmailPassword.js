import React, { useState } from 'react'
import './emailpassword.scss';
import { withRouter } from 'react-router-dom'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';

import { auth } from '../../firebase/utils'

const EmailPassword = (props) => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // when deploying need to insert the actual url of the login page
            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                   props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found, please try again']
                   setErrors(err)
                })

        } catch (err) {
            // console.log(err);
        }
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
