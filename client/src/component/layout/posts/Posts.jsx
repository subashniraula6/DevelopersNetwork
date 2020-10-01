import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../Spinner'
import { getPosts } from '../../../actions/post.actions'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, isLoading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])

    return <Fragment>
        <PostForm />
        {
            isLoading && posts.length === 0 ? <Spinner /> :
                posts.map(post => <PostItem post={post} key={post._id} />)
        }
    </Fragment>
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.postReducer
})

export default connect(mapStateToProps, { getPosts })(Posts)
