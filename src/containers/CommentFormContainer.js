import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentForm from '../components/CommentForm'
import Loading from '../components/Loading'
import { submitComment, loadComment } from '../actions/comments'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class CommentFormContainer extends Component {
  componentWillMount() {
    const { loadComment } = this.props
    const commentId = this.props.commentId

    commentId && loadComment(commentId)
  }

  handleSubmit = fields => {
    const parentPostId = this.props.parentPostId

    this.props.submitComment(fields, parentPostId)
  }

  render() {
    const { isFetching } = this.props
    const commentId = this.props.commentId
    if (commentId && isFetching) return <Loading />
    return <CommentForm onSubmit={this.handleSubmit} {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { commentsById, ui } = state
  const isFetching = ui.isFetching
  const commentId = ownProps.commentId
  return {
    initialValues: commentsById[commentId],
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: data => dispatch(loadComment(data)),
    submitComment: (data, parentId) => dispatch(submitComment(data, parentId))
  }
}
CommentFormContainer.propTypes = {
  submitComment: PropTypes.func.isRequired,
  loadComment: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  commentId: PropTypes.number,
  parentPostId: PropTypes.number.isRequired,
  history: PropTypes.object
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer)
)
