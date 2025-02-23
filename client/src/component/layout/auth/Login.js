import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions/auth.actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Form,
    SigninContainer,
    SignInWrapper,
    EmailInput,
    PasswordInput,
    SubmitButton,
    InputContainer
} from './Login.styles'
import { Email, Lock } from '@material-ui/icons'

const Login = ({ loginUser, auth }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const user = {
            email,
            password
        }

        try {
            loginUser(user);
        } catch (error) {
            console.error(error.response.data)
        }

    }
    if (auth) {
        return <Redirect to="/dashboard" />
    }

    return (
        <SigninContainer>
            <SignInWrapper>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Login to your account</p>

                <Form className="form" onSubmit={handleSubmit}>
                    <InputContainer>
                        <Email />
                        <EmailInput
                            type="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            variant='standard'
                            required
                            autoFocus
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Lock />

                        <PasswordInput
                            type="password"
                            label="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={handleChange}
                            required
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                        />
                    </InputContainer>


                    <SubmitButton type="submit" variant='contained' color='primary'>Login</SubmitButton>
                </Form>
                <p className="my-1">
                    Do not have an account? <Link to="/register">Register</Link>
                </p>
            </SignInWrapper>
        </SigninContainer>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login);