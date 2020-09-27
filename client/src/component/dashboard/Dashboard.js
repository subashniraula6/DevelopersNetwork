import React, { Fragment, useEffect } from 'react'
import { getCurrentProfile } from '../../actions/profile.actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardActions'
import ExperienceList from './ExperienceList'
import EducationList from './EducationList'
import {deleteAccount} from '../../actions/profile.actions'

const Dashboard = ({ getCurrentProfile, deleteAccount, profile: { profile, isLoading }, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    if(user) console.log(user._id)
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
                        <ExperienceList experience={profile.experience} />
                        <EducationList education={profile.education} />
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={deleteAccount}>
                                <i className="fas fa-user-minus"></i>
                                &nbsp; Delete My Account
                            </button>
                        </div>
                    </Fragment>)
                }
            </Fragment>
        )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);