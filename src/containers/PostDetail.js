import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loadPost } from '../actions/posts'
import { loadComments } from '../actions/comments'
import Post from '../components/Post'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { getCommentsForId } from '../reducers'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    loadPost: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    postId: PropTypes.number,
    match: PropTypes.object,
    history: PropTypes.object
  }
  componentWillMount() {
    const { match, loadPost, loadComments } = this.props
    const postId = match.params.postId
    loadPost(postId)
    loadComments(postId)
  }

  render() {
    const { post, comments, isFetching } = this.props
    if (isFetching) return <Loading />

    return (
      <div className="section">
        <Post key={post.id} post={post} comments={comments} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { posts, ui } = state
  const isFetching = ui.isFetching
  const { match } = ownProps
  const postId = match.params.postId
  return {
    post: posts.postsById[postId],
    comments: getCommentsForId(state, postId),
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: data => dispatch(loadPost(data)),
    loadComments: data => dispatch(loadComments(data))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
)
