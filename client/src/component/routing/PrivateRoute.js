import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) => (
    <Route {...rest} render={props =>
        !isLoading && !isAuthenticated ?
            (<Redirect to="/login" />)
            : (<Component {...props} />)}
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.authReducer
})
export default connect(mapStateToProps, null)(PrivateRoute);