import postActionTypes from '../actions/post.types'

const {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} = postActionTypes;

const INITIAL_STATE = {
    posts: [],
    post: null,
    isLoading: true,
    error: {}
}

export default function postReducer(state = INITIAL_STATE, action) {
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
                posts: state.posts.map(post => post._id === payload._id ? { ...post, likes: payload.likes } : post)
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload._id),
                isLoading: false
            }
        case ADD_POST:
            return {
                ...state,
                // posts: state.posts.unshift(payload), This didnt worked why??
                posts: [...state.posts, payload],//This worked
                isLoading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                isLoading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                isLoading: false  
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: state.post.comments.filter(comment => comment._id !== payload) }
            }
        default:
            return state;
    }
}