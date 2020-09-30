import postActionTypes from '../actions/post.types'

const {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} = postActionTypes;

const INITIAL_STATE = {
    posts: [],
    post: null,
    isLoading: true,
    error: {}
}

export default function postReducer (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                isLoading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case UPDATE_LIKES: 
        return {
            ...state,
            isLoading: false,
            posts: state.posts.map(post=> post._id === payload._id ? {...post, likes: payload.likes} : post)
        }
        default:
            return state;
    }
}