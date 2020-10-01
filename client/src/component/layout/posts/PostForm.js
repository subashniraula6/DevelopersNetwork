import React, { useState } from 'react'
import { addPost } from '../../../actions/post.actions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PostForm = ({ addPost }) => {

    const [postForm, setPostForm] = useState({
        text: ''
    })
    const { text } = postForm;
    return (
        <div className="post-form">
            <h1 className="large text-primary">
                Posts
             </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        value={text}
                        onChange={(e) => setPostForm({
                            ...postForm,
                            [e.target.name]: e.target.value
                        })}
                        required
                    ></textarea>
                    <input
                        type="submit"
                        className="btn btn-dark my-1"
                        value="Submit"
                        onClick={(e) => {
                            e.preventDefault();
                            addPost(postForm);
                            setPostForm({text: ''});
                        }
                        } />
                </form>
            </div>
        </div>
    )
}
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}
export default connect(null, { addPost })(PostForm);
