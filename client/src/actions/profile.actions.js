import axios from 'axios';
import { setAlert } from './alert.actions'
import profileActionTypes from './profile.types'

const {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} = profileActionTypes;

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { errorType: error.response.statusText, status: error.response.status, msg: error.response.data.msg }
        })
    }

}

//Clear profile
export const clearProfile = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
}

//Create/Update Profile
export const createProfile = (profileData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(profileData);
    try {

        const res = await axios.post('/api/profile/', body, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: { errorType: error.response.statusText, status: error.response.status }
        })
    }
}

export const addExperience = (experienceData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(experienceData);
    console.log(experienceData)
    try {
        const res = await axios.put('/api/profile/experience', body, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert("Experience Added", "success")
        );

        history.push('/dashboard');
    } catch (error) {
        console.log(error)
        const errors = error.response.data.errors;

        if (!errors) return;
        errors.forEach(error => dispatch(
            setAlert(error.msg, "danger")
        )
        )

        dispatch({
            type: PROFILE_ERROR,
            payload: { errorType: error.response.statusText, status: error.response.status }
        })
    }
}

//Add Education
export const addEducation = (educationData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(educationData);
    
    try {
        const res = await axios.put('/api/profile/education', body, config);
        console.log(res)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Added", "success"));

        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { errorType: error.response.statusText, status: error.response.status }
        })
    }
}