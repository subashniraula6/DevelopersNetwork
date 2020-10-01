import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {removeComment} from '../../../actions/post.actions'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const CommentItem = ({ postId, comment, removeComment, match, auth }) => {

    const { _id, date, text, name, avatar, user } = comment
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to="/profile">
                    <img
                        className="round-img"
                        src={avatar}
                        alt="pp"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="YYYY-MM-DD">{date}</Moment>
                </p>
            </div>
            {
                auth && !auth.isLoading && user === auth.user._id && 
                <i className="fa fa-times-circle" aria-hidden="true" onClick={(e)=> removeComment(postId, _id)}></i>
            }
        </div>
    )
}

CommentItem.propTypes = { 
    removeComment: PropTypes.func.isRequired,
    auth: PropTypes.object
 }
 const mapStateToProps = state => ({
     auth: state.authReducer
 }) 

export default connect(mapStateToProps, { removeComment })(withRouter(CommentItem));
