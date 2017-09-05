import React from 'react'
import PropTypes from 'prop-types'
import CommentContainer from '../containers/CommentContainer'
import List from './List'

function Comments(props) {
  function renderComment(comment) {
    if (comment.deleted) return null
    return <CommentContainer key={comment.id} comment={comment} />
  }
  return <List renderItem={renderComment} items={props.comments} />
}

Comments.propTypes = {
  comments: PropTypes.array,
  isFetching: PropTypes.bool
}

export default Comments
