import React, { Fragment } from 'react'
import CommentItem from './CommentItem'
import PropTypes from 'prop-types'

const Comments = ({ post }) => {
    const { comments } = post;
    return <Fragment>
        {
            comments.map(comment => <CommentItem postId={post._id} comment={comment} key={comment._id}/>)
        }
    </Fragment>
}

Comments.propTypes = {
    comments: PropTypes.array
}
export default Comments
