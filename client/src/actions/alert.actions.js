import alertActionTypes from './alert.types'
import {v4 as uuidv4} from 'uuid'
const { SET_ALERT, REMOVE_ALERT } = alertActionTypes;


export const setAlert = (msg, type, timeout=5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, type, id }
    })

    setTimeout(()=> dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout);
}

