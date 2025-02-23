import React from 'react'
import Moment from 'react-moment'

const Experience = ({ experience }) => {
    return <div>
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {
                experience.length === 0 ? <h4> Experience not added </h4> :
                    experience.map(exp => {
                        const {
                            title,
                            company,
                            location,
                            from,
                            to,
                            current,
                            description
                        } = exp;
                        return <div key={exp._id}>
                            <h3>{company}</h3>
                            <p><Moment format="YYYY/MM/DD">{from}</Moment>
                            -
                            {current ? 'NOW' : <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
                            <p><strong>Position: </strong>{title}</p>
                            <p><strong>Description: </strong>{description}</p>
                            {location && <p><strong>Location: </strong>
                                {location}
                            </p>}
                        </div>
                    })
            }
        </div>
    </div>
}

export default Experience;