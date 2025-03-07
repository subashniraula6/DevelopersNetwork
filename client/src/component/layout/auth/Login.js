import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions/auth.actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
    if(auth){
        return <Redirect to="/dashboard"/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Login to your account</p>
            <form className="form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Do not have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
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