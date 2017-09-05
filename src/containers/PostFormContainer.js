import React, { Component } from 'react'
import PostForm from '../components/PostForm'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import { submitPost, loadPost } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import { getCategories } from '../reducers'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostFormContainer extends Component {
  componentWillMount() {
    const { match, loadPost, loadCategories } = this.props
    const postId = this.props.postId || match.params.postId
    loadCategories()
    postId && loadPost(postId)
  }

  handleSubmit = fields => {
    const from = this.props.location.state
      ? this.props.location.state.from || '/'
      : '/'
    this.props.submitPost(fields).then(() => this.props.history.push(from))
  }

  render() {
    const { isFetching, match } = this.props
    const postId = this.props.postId || match.params.postId
    if (postId && isFetching) return <Loading />

    return <PostForm onSubmit={this.handleSubmit} {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { posts, ui } = state
  const isFetching = ui.isFetching
  const { match } = ownProps
  const postId = ownProps.postId || match.params.postId
  return {
    initialValues: posts.postsById[postId],
    isFetching,
    categories: getCategories(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: data => dispatch(loadPost(data)),
    submitPost: data => dispatch(submitPost(data)),
    loadCategories: () => dispatch(loadCategories())
  }
}
PostFormContainer.propTypes = {
  submitPost: PropTypes.func.isRequired,
  loadPost: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  categories: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  postId: PropTypes.number,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)
)
