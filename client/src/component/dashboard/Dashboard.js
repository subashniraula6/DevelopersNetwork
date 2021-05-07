import React, { Fragment, useEffect } from 'react'
import { getCurrentProfile } from '../../actions/profile.actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardActions'
import ExperienceList from './ExperienceList'
import EducationList from './EducationList'
import { deleteAccount } from '../../actions/profile.actions'
import Button from '@material-ui/core/Button'

const Dashboard = ({ getCurrentProfile, deleteAccount, profile: { profile, isLoading }, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
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

                        <Button variant='contained' color='primary'>
                            <Link to="/create-profile">Create Profile</Link>
                        </Button>
                    </Fragment>) :
                    (<Fragment>
                        <DashboardAction />
                        <ExperienceList experience={profile.experience} />
                        <EducationList education={profile.education} />
                    </Fragment>)
                }
                <div className="my-2">
                    <Button variant='contained' color='secondary' onClick={deleteAccount}>
                        <i className="fas fa-user-minus"></i>
                                &nbsp; Delete My Account
                            </Button>
                </div>
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