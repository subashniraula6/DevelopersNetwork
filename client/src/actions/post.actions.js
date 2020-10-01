import postActionTypes from './post.types';
import axios from 'axios'
import {setAlert} from './alert.actions'

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

//Get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Add Like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { _id: postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Remove Like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { _id: postId, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Delete post
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: res.data
        })
        console.log(res.data);
        dispatch(setAlert('Post deleted', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.msg, status: error.response.status }
        })
    }
}

//Add post 
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post('/api/posts', body, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created!', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Get post
export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Add Comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post(`/api/posts/comments/${postId}`, body, config);
        dispatch({         
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('comment added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//Remove Comment
export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('comment removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: commentId
        })
    }
}