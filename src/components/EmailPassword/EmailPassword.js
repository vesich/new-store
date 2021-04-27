import React, { Component } from 'react'
import './emailpassword.scss';
import { withRouter } from 'react-router-dom'

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Forminput from '../forms/Forminput/Forminput';
import Button from '../forms/Button/Button';

import { auth } from '../../firebase/utils'

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
    constructor(props) {
        super();
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;

            // when deploying need to insert the actual url of the login page
            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found, please try again']
                    this.setState({
                        errors: err
                    })
                })

        } catch (err) {
            // console.log(err);
        }
    }

    render() {
        const { email, errors } = this.state
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
                    <form onSubmit={this.handleSubmit}>
                        <Forminput
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            onChange={this.handleChange}
                        />
                        <Button type='submit'>
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }
}

export default withRouter(EmailPassword)
