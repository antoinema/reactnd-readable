import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import List from './List'

function Comments(props) {
  function renderComment(comment) {
    return <Comment key={comment.id} comment={comment} />
  }
  return <List renderItem={renderComment} items={props.comments} />
}

Comments.propTypes = {
  comments: PropTypes.array,
  isFetching: PropTypes.bool
}

export default Comments
