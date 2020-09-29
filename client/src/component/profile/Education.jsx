import React, { Fragment } from 'react'
import Moment from 'react-moment'

const Education = ({ education }) => {
    return <Fragment>
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
                education.length === 0 ? <h4> Education not added </h4> :
                    education.map(edu => {
                        const { school, faculty, from, to, current, degree, description } = edu;
                        return <div key={edu._id}>
                            <h3>{school}</h3>
                            <p><Moment format="YYYY/MM/DD">{from}</Moment>
                            -
                            {current ? 'NOW' : <Moment format="YYYY/MM/DD">{to}</Moment>}</p>
                            <p><strong>Degree: </strong>{degree}</p>
                            <p><strong>Field Of Study: </strong>{faculty}</p>
                            <p>
                                <strong>Description: </strong>
                                    {description}
                            </p>
                        </div>
                    })
            }
        </div>
    </Fragment>
}

export default Education
