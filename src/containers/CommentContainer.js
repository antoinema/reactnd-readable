import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from '../components/Comment'
import { showCommentEdit, hideCommentEdit } from '../actions/ui'
import { connect } from 'react-redux'

class CommentContainer extends Component {
  render() {
    const comment = this.props.comment
    return <Comment key={comment.id} comment={comment} {...this.props} />
  }
}

CommentContainer.propTypes = {
  comment: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    showCommentEdit: data => dispatch(showCommentEdit(data)),
    hideCommentEdit: () => dispatch(hideCommentEdit())
  }
}

export default connect(null, mapDispatchToProps)(CommentContainer)
