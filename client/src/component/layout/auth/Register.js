import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert.actions'
import PropTypes from 'prop-types'
import { registerUser } from '../../../actions/auth.actions'
import { Link, Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
    RegisterContainer,
    RegisterWrapper,
    Form,
    InputContainer,
} from './Register.styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Lock, Email } from '@material-ui/icons'


const Register = ({ setAlert, registerUser, auth }) => {

    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const { name, email, password, confirmPassword } = formData;

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Passwords do not match!", "danger");
            return;
        }

        const newUser = {
            name,
            email,
            password
        }

        registerUser(newUser);
    }

    if (auth) {
        return <Redirect to="/dashboard" />
    }

    return (
        <RegisterContainer>
            <RegisterWrapper>
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <Form className="form" onSubmit={handleSubmit}>
                    <InputContainer>
                        <AccountCircle />
                        <TextField type="text"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            value={name}
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                            autoFocus

                        />
                    </InputContainer>

                    <InputContainer>
                        <Email />
                        <TextField
                            type="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Lock />
                        <TextField
                            type="password"
                            label="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={handleChange}
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                        />

                    </InputContainer>

                    <InputContainer>
                        <Lock />
                        <TextField
                            type="password"
                            variant='standard'
                            label="Confirm Password"
                            name="confirmPassword"
                            minLength="6"
                            value={confirmPassword}
                            onChange={handleChange}
                            style={{ 'width': '100%', 'margin-left': '10px' }}
                        />
                    </InputContainer>


                    <Button
                        type="submit"
                        color='secondary'
                        variant='contained'
                        style={{ 'width': '60%', 'margin': '30px', 'background': '#9c27b0' }}
                    >
                        Sign Up
                    </Button>

                </Form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, registerUser })(Register);