import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { user: { name },
    avatar,
    status,
    location,
    company,
    skills,
    bio,
    social,
    website
} }) => {
    return (
        <div className="profile-grid my-1">
            {/* <!-- Top --> */}
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead"> {status} {company && <span> at {company} </span>} </p>
                <p>{location && <span> {location} </span>}</p>
                <div className="icons my-1">
                    {
                        website &&
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    }
                    
                    {
                        social && social.twitter &&
                        <a href={social.twitter || '#'} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                    }

                    {
                        social && social.facebook &&
                        <a href={social.facebook || '#'}>
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    }
                    
                    {
                        social && social.linkedin &&
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    }
                    {
                        social && social.youtube &&
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    }
                    
                    {
                        social && social.instagram &&
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    }
                </div>
            </div>

            {/* <!-- About --> */}
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{name}'s Bio</h2>
                {
                    bio && <p> {bio} </p>
                }
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {
                        skills.map((skill, index) => {
                            return <div className="p-1" key={index}><i className="fa fa-check"></i> &nbsp; {skill}</div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
