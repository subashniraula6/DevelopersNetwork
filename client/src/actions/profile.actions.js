import axios from 'axios';
import { setAlert } from './alert.actions'
import profileActionTypes from './profile.types'
import { logOutUser } from './auth.actions'
import { Redirect } from 'react-router-dom';

const {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    ACCOUNT_DELETED
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
//Add experience
export const addExperience = (experienceData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(experienceData);

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

//Delete Experience
export const deleteExperience = exp_id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Deleted Experience", 'danger'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: error.response.status, statusText: error.response.statusText }
        })
    }

}


//Delete Education
export const deleteEducation = edu_id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${edu_id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Deleted Education", 'danger'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { errorStatus: error.response.status, errorStatusText: error.response.statusText }
        })
    }

}

//Delete Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
        try {
            console.log('checkpoint')
            const res = await axios.delete(`/api/profile`);
            dispatch({
                type: ACCOUNT_DELETED
            })
            dispatch(logOutUser());
            dispatch(setAlert(res.data.msg, 'danger'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { status: error.response.status, statusText: error.response.statusText }
            })
        }
    }
}