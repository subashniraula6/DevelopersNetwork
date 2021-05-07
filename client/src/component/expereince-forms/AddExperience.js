import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profile.actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Checkbox, TextareaAutosize, TextField } from '@material-ui/core'

const AddExperience = ({ addExperience, history }) => {
    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = experienceData;

    const handleChange = event => {
        return setExperienceData({
            ...experienceData,
            [event.target.name]: event.target.value
        })
    }

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        addExperience(experienceData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
      </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
            <small>* = required field</small>
            <form className="form">
                <div className="form-group">
                    <TextField variant='standard' type="text" label="* Job Title" name="title" value={title} onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <TextField variant='standard' input type="text" label="* Company" name="company" value={company} onChange={(e) => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <TextField variant='standard' type="text" label="Location" name="location" value={location} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-group">
                    <h4>*From Date</h4>
                    <TextField type="date" name="from" value={from} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-group">
                    <p><Checkbox name="current" value={current} checked={current} onChange={() => {
                        setExperienceData({
                            ...experienceData,
                            current: !current
                        })
                        setToDateDisabled(!toDateDisabled)
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <TextField type="date" name="to" value={current ? '' : to} onChange={(e) => handleChange(e)} disabled={toDateDisabled ? 'disabled' : null} />
                </div>
                <div className="form-group">
                    <TextareaAutosize
                        rowsMin={3}
                        name="description"
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => handleChange(e)}
                    ></TextareaAutosize>
                </div>
                <Button variant='contained' color='primary' type="submit" onClick={(e) => handleSubmit(e)}>Save</Button>
                <Button variant='contained' color='secondary'> <Link to="/dashboard" style={{'color': 'white'}}>Go Back</Link> </Button>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));