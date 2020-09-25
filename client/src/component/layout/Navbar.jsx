import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import authActionTypes from '../../actions/auth.types'
import {logOutUser} from '../../actions/auth.actions'


const Navbar = ({ auth: { isLoading, isAuthenticated }, logOutUser }) => {
    const authLinks = (
        <ul>
            <li><i className="fas fa-sign-out-alt"></i><a href="#" onClick={logOutUser}> Logout </a></li>
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
    logOutUser: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {logOutUser})(Navbar);