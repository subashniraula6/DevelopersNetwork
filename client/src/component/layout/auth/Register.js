import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert.actions'
import PropTypes from 'prop-types'
import { registerUser } from '../../../actions/auth.actions'
import { Link, Redirect } from 'react-router-dom'
 
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

    if(auth){
        return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        value={name} />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        minLength="6"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
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