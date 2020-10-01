import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../../actions/post.actions'
import { deletePost } from '../../../actions/post.actions'

const PostItem = ({ auth, addLike, removeLike, deletePost, showActions,
    post: { _id, text, name, avatar, date, user, likes, comments } }) => {

    return (
        <div className="posts">
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to='/'>
                        <img
                            className="round-img"
                            src={avatar}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        Posted on : <Moment format="YYYY/MM/DD">{date}</Moment>
                    </p>
                    {
                        showActions && <Fragment>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={(e) => addLike(_id)}
                            >
                                <i className="fas fa-thumbs-up"></i> &nbsp;
                                <span>{likes.length}</span>
                            </button>
                            <button type="button" className="btn btn-light" onClick={(e) => removeLike(_id)}>
                                <i className="fas fa-thumbs-down"></i> &nbsp;
                            </button>
                            <Link
                                to={`/post/${_id}`}
                                className="btn btn-primary">
                                Discussion &nbsp; {comments.length > 0 && <span className='comment-count'>{comments.length}</span>
                                }
                            </Link>
                            {!auth.isLoading && user === auth.user._id && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={(e) => deletePost(_id)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            )}

                        </Fragment>
                    }

                </div>
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.authReducer
})
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)