import authActionTypes from '../actions/auth.types'
import axios from 'axios'
import { setAlert } from './alert.actions'
import setAuthToken from '../utils/setAuthToken';
import { clearProfile } from '../actions/profile.actions'

const { REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} = authActionTypes;


//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register User
export const registerUser = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(user);

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;

        if (!errors) return;
        errors.forEach(error => dispatch(
            setAlert(error.msg, "danger")
        )
        )

        dispatch({
            type: REGISTER_FAILURE
        })
    }
}

//Login User
export const loginUser = (userCredentials) => async dispatch => {
    const config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(userCredentials);

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (error) {
        const errors = error.response.data.errors;

        if (!errors) return;
        errors.forEach(error => dispatch(
            setAlert(error.msg, "danger")
        )
        )

        dispatch({
            type: LOGIN_FAILURE
        })
    }
}
//Logout User 
export const logOutUser = () => dispatch =>{
    try {
      
        dispatch(clearProfile())

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch(error){
        dispatch({
            type: LOGOUT_FAILURE
        })
    }
    
}
