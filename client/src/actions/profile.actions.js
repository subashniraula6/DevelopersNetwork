import axios from 'axios';
import { TokenExpiredError } from 'jsonwebtoken';
import { setAlert } from './alert.actions'
import profileActionTypes from './profile.types'

const {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
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
        type: 'CLEAR_PROFILE'
    })
}

//Create Profile
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

        dispatch(setAlert(edit ? "Profile Updated": "Profile Created"));

        if(!edit){
            history.push('/dashboard');
        }

    } catch (error){
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { errorType: error.response.statusText, status: error.response.status}
        })
    }
}