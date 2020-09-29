import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile.actions'
import ProfileItem from './ProfileItem'


const Profiles = ({ getProfiles, profiles: { profiles, isLoading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        isLoading === true ? <h1>Loading...........</h1>
            :
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i>
                Browse and connect with developers
            </p>
                {
                    profiles.length > 0 ?
                        (profiles.map(profile => {
                            return <ProfileItem profile={profile} key={profile._id} />
                        })
                        ) :
                        <h4>No Profiles Found</h4>

                }

            </Fragment>
    )
}
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired
}
export const mapStateToProps = state => ({
    profiles: state.profileReducer
})
export default connect(mapStateToProps, { getProfiles })(Profiles);