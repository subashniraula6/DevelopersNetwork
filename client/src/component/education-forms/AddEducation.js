import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profile.actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const AddEducation = ({ addEducation, history }) => {

    const [educationData, setEducationData] = useState({
        school: '',
        degree: '',
        faculty: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const {
        school,
        degree,
        faculty,
        from,
        to,
        current,
        description
    } = educationData;

    const handleChange = event => {
        return setEducationData({
            ...educationData,
            [event.target.name]: event.target.value
        })
    }

    const [ toDateDisabled, setToDateDisabled ] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        addEducation(educationData, history);
    }

    console.log(educationData)

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
      </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
            <small>* = required field</small>
            <form className="form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Faculty" name="faculty" value={faculty} onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => handleChange(e)} />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current"
                            value={current}
                            checked={current}
                            onChange={(e) => {
                                setEducationData({ ...educationData, current: !current });
                                setToDateDisabled(!toDateDisabled);
                            }} /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to}
                        value = { toDateDisabled ? '' : to }
                        onChange={(e) => handleChange(e)}
                        disabled={toDateDisabled ? 'disabled' : null}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" onClick={(e) => handleSubmit(e)} />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));