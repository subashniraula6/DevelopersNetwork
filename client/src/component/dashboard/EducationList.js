import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile.actions'

const EducationList = ({ education, deleteEducation }) => {

    const educations = education.map(edu => {
        return (
            <tr key={edu._id}>
                <td> {edu.school} </td>
                <td className="hide-sm"> {edu.degree} </td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment>
                    &nbsp; - &nbsp;
                        {
                        edu.current === true ? ('NOW')
                            : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                    }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteEducation(edu._id) }>
                        Delete
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <section className="container">
            <h2 className='my-2'> Education Credentials </h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'></th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </section>
    )
}

EducationList.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null, { deleteEducation })(EducationList);