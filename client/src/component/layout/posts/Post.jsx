import React, { Fragment, useEffect } from 'react'
import { getPost } from '../../../actions/post.actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostItem from './PostItem'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comments from './Comments'

const Post = ({ getPost, post: { post, isLoading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);
    return isLoading || post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className='btn' > Back to Posts </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm post={post} />
        {
            post.comments && post.comments.length > 0 ? <Comments post={post}/>: <h4>No comments yet</h4>  
        }
    </Fragment>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.postReducer
})
export default connect(mapStateToProps, { getPost })(Post);
