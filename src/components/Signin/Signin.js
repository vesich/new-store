import React from 'react';
import './signin.scss';
import Button from '../forms/Button/Button';
import { signInWithGoogle, auth } from '../../firebase/utils'

import Forminput from '../forms/Forminput/Forminput'


const initialState = {
    email: '',
    password: ''
}

class Signin extends React.Component {
    constructor(props) {
        super(props);
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

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });
        } catch (err) {
            // console.log(err);
        }
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className='signin'>
                <div className="wrap">
                    <h2>Login</h2>
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>
                            <Forminput
                                type='email'
                                name='email'
                                value={email}
                                placeholder="Email"
                                handleChange={this.handleChange}
                            />
                            <Forminput
                                type='password'
                                name='password'
                                value={password}
                                placeholder="Password"
                                handleChange={this.handleChange}
                            />
                            <Button type='submit'>
                                LogIn
                            </Button>
                            <div className="socialSignin">
                                <div className='row'>
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                               </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin