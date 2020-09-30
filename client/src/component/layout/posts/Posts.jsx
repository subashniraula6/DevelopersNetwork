import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { getPosts } from '../../../actions/post.actions'
import PostItem from './PostItem'

const Posts = ({ getPosts, post: { posts, isLoading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    
    return <Fragment>
        {
            isLoading && posts.length === 0 ? <Spinner /> :
                posts.map(post => <PostItem post={post} key={post._id}/>)
        }
    </Fragment>
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.postReducer
})

export default connect(mapStateToProps, { getPosts })(Posts)
