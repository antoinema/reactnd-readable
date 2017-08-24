import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { upVote, downVote } from '../actions/posts'
import { editPost } from '../actions/postForm'

import Post from '../components/Post'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired
  }

  render() {
    const { post, upVote, downVote } = this.props
    return (
      <Post
        key={post.id}
        post={post}
        upVote={upVote}
        downVote={downVote}
        editPost={editPost}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: data => dispatch(upVote(data)),
    downVote: data => dispatch(downVote(data)),
    editPost: data => dispatch(editPost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostContainer)
