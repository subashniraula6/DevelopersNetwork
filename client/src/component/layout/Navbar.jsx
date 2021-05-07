import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOutUser } from '../../actions/auth.actions'
import { FaConnectdevelop } from 'react-icons/fa'

const Navbar = ({ auth: { isLoading, isAuthenticated }, logOutUser }) => {
    const authLinks = (
        <ul>
            <li><Link to="/profiles"><i class="fa fa-users" aria-hidden="true" style={{ 'color': 'white', 'margin-right': '3px' }}></i>Developers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li>
                <Link to='/login' onClick={logOutUser}><i className="fas fa-sign-out-alt" style={{ 'color': 'white', 'margin-right': '3px' }}></i>Logout </Link>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li><Link to="/profiles"><i className="fa fa-users" aria-hidden="true" style={{ 'color': 'white', marginRight: '3px' }}></i>Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li>
                <Link to="/login">Login</Link> {/* Login redirects to Dashboard */}
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-orange">
            <h1>
                <Link to="/">
                    <FaConnectdevelop /> DevNetwork</Link>
            </h1>
            {
                !isLoading && (<Fragment> { isAuthenticated ? authLinks : guestLinks}</Fragment>)
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

export default connect(mapStateToProps, { logOutUser })(Navbar);