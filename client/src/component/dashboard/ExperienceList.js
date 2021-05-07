import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile.actions'
import Button from '@material-ui/core/Button'

const ExperienceList = ({ experience, deleteExperience }) => {
    
    const experiences = experience.map(exp => {

        return (
            <tr key={exp._id}>
                <td> {exp.company} </td>
                <td className="hide-sm"> {exp.title} </td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment>
                    {/* <Moment format="YYYY/MM/DD">{exp.from} </Moment> //Here mistakenly putting 'SPACE' created invalid Date*/}
                    &nbsp; - &nbsp;
                    {
                        exp.to === null ? ('NOW')
                            : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                    }
                </td>
                <td className="hide-sm">
                    <Button variant='contained' color='secondary' onClick={() => deleteExperience(exp._id)}>
                        Delete
                    </Button>
                </td>

            </tr>
        )
    })
    return (
        <section className="container">
            <h2 className='my-2'> Experience Credentials </h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </section>
    )
}

ExperienceList.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null, { deleteExperience })(ExperienceList);