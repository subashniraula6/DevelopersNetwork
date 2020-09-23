import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import authActionTypes from '../../actions/auth.types'

const { LOGOUT_SUCCESS } = authActionTypes;



const Navbar = ({ auth: { isLoading, isAuthenticated }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link onClick={logout}> Logout </Link></li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li>
                <Link to="/login">Login</Link> {/* Login redirects to Dashboard */}
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {
                !isLoading && (<> { isAuthenticated ? authLinks: guestLinks }</>)
            }
        </nav>
    )
}
Navbar.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.authReducer
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: LOGOUT_SUCCESS })
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);