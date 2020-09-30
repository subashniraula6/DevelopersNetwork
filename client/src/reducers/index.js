import { combineReducers } from 'redux'
import alertReducer from './alert.reducer'
import authReducer from './auth.reducer'
import profileReducer from './profile.reducer'
import postReducer from './post.reducer'

export default combineReducers({
    alertReducer,
    authReducer,
    profileReducer,
    postReducer
})