import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

const Landing = ({isAuthenticated}) => {
    
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Network</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
          </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(Landing);