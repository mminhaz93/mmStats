/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import PostForm from './Postform'

class Posts extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-shadow
    const { fetchPosts } = this.props
    fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = this.props
    if (nextProps.newPost) {
      posts.unshift(nextProps.newPost)
    }
  }

  render() {
    // console.log('posts', this.props);
    const { posts } = this.props
    const postItems = posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
    return (
      <div>
        <PostForm />
        <h1>Posts</h1>
        {postItems}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item,
})

export default connect(
  mapStateToProps,
  { fetchPosts },
)(Posts)
