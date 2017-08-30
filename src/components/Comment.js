import React from 'react'
import PropTypes from 'prop-types'

const Comment = props => {
  return (
    <p>
      {props.body}
    </p>
  )
}
Comment.propTypes = {
  body: PropTypes.string.isRequired
}
export default Comment
