import profileActionTypes from '../actions/profile.types'

const {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} = profileActionTypes;

const INITIAL_STATE = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {}
}


const ProfileReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:     
            return {
                ...state,
                profile: payload,
                isLoading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false //Mistakenly I misspelled loading. This created a huge error i.e. user with no profile dashboard is always loading(spinner)
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                isLoading: false,
                repos: [],
            }

        default: return state; 
    }
}
export default ProfileReducer;
