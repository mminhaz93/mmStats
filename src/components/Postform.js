/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPost } from '../actions/postActions'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    const { title, body } = this.state
    // eslint-disable-next-line no-shadow
    const { createPost } = this.props
    e.preventDefault()

    const post = {
      title,
      body,
    }

    createPost(post)
  }

  render() {
    const { title, body } = this.state
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type='text'
              name='title'
              onChange={this.onChange}
              value={title}
            />
          </div>
          <br />
          <div>
            <label>Body: </label>
            <br />
            <textarea name='body' onChange={this.onChange} value={body} />
          </div>
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
}

export default connect(
  null,
  { createPost },
)(PostForm)
