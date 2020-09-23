import authActionTypes from '../actions/auth.types'
const { REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} = authActionTypes;

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload
            }
        }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case AUTH_ERROR: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        }
        case LOGOUT_SUCCESS: {
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated:false,
                isLoading: false
            }
        }
        case LOGOUT_FAILURE:
        default: return state;
    }
}
export default authReducer;