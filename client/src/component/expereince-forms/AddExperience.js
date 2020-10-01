import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {addExperience} from '../../actions/profile.actions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const AddExperience = ({addExperience, history}) => {    
    const [ experienceData, setExperienceData ] = useState({
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

    const [ toDateDisabled, setToDateDisabled ] = useState(false);

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
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={(e)=> handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={(e)=> handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=> handleChange(e)}/>
                </div>
                <div className="form-group">
                    <h4>*From Date</h4>
                    <input type="date" name="from" value={from} onChange={(e)=> handleChange(e)}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} checked={current} onChange={()=> {
                        setExperienceData({
                            ...experienceData,
                            current : !current
                        })
                        setToDateDisabled(!toDateDisabled)
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={current ? '' : to} onChange={(e)=> handleChange(e)} disabled={toDateDisabled ? 'disabled' : null}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} 
                        onChange={(e)=> handleChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" onClick={(e)=> handleSubmit(e)}/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));