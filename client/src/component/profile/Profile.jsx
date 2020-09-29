import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfile } from '../../actions/profile.actions'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import Experience from './Experience'
import Education from './Education'
import Repos from './Repos'

const Profile = ({ getProfile, profile: { profile, isLoading }, auth, match }) => {
    useEffect(() => {
        getProfile(match.params.id);
    }, [getProfile, match.params.id]);

    return (
        isLoading || profile === null ? <Spinner /> : <Fragment>
            <Link to="/profiles" className="btn btn-light">
                Back To Profiles
            </Link>

            {
                auth.isAuthenticated && !isLoading && auth.user._id === profile.user._id ? <Link to='/edit-profile' className='btn btn-dark' >Edit Profile</Link> :
                    <Fragment>
                        <ProfileTop profile={profile} />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} /> 
                        {
                            profile.githubusername && <Repos profile={profile} githubusername={profile.githubusername} />
                        }
                    </Fragment>
            }

        </Fragment>
    )
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
}
export const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
})

export default connect(mapStateToProps, { getProfile })(Profile)