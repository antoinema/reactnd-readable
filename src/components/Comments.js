import React from 'react'
import PropTypes from 'prop-types'
import CommentContainer from '../containers/CommentContainer'
import List from './List'
import CommentSort from './CommentSort'

function Comments(props) {
  function renderComment(comment) {
    if (comment.deleted) return null
    return <CommentContainer key={comment.id} comment={comment} />
  }
  return (
    <div className="container">
      <CommentSort onSort={props.onSort} />
      <List renderItem={renderComment} items={props.comments} />
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  isFetching: PropTypes.bool,
  onSort: PropTypes.func.isRequired
}

export default Comments
