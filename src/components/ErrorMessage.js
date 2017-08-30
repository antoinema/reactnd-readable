import React from 'react'
import PropTypes from 'prop-types'

function ErrorMessage(props) {
  return (
    <div className="section">
      <article className="message is-danger">
        <div className="message-body">
          {props.errorMessage}
        </div>
      </article>
    </div>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired
}
export default ErrorMessage
