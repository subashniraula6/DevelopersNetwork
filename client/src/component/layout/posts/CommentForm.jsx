import React, {useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../../../actions/post.actions'

const CommentForm = ({ post, addComment }) => {
    const [ formData, setFormData ] = useState({
        text: ''
    })

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1">
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={formData.text}
                    placeholder="Comment on this post"
                    onChange={(e) => setFormData({
                        [e.target.name]: e.target.value
                    })}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Comment" onClick={(e)=>{
                    e.preventDefault();
                    addComment(post._id, formData);
                    setFormData({text: ''})
                }} />
            </form>
        </div>
    )
}
CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
}
export default connect(null, { addComment })(CommentForm)
