import React, { Fragment, useEffect } from 'react'
import { getCurrentProfile } from '../../actions/profile.actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardActions'

const Dashboard = ({ getCurrentProfile, profile: { profile, isLoading }, auth: { user } }) => {
    
    useEffect(() => {
        getCurrentProfile();
    }, []);
    
    return isLoading && profile === null ? (<Spinner />) //second condition is used considering 
        //when reloading, initially both isLoading & profile=null true so spinner loads first time.
        : (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Welcome {user && user.name}
                </p>

                { profile === null ?
                    (<Fragment>
                        <p>You have not yet setup a profile. Please add some info.</p>
                        <Link to="/create-profile" className="btn btn-primary">Create Profile</Link>
                    </Fragment>) :
                    (<Fragment>
                        <DashboardAction />
                    </Fragment>)
                }

            </Fragment>
        )

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);