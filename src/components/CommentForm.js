import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

const CommentForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Author</label>
        <div className="control has-icons-left">
          <Field
            type="text"
            placeholder="Text input"
            name="author"
            component="input"
            className="input"
          />
          <span className="icon is-small is-left">
            <i className="fa fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <Field
            className="textarea"
            placeholder="Textarea"
            name="body"
            component="textarea"
          />
        </div>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default withRouter(
  reduxForm({
    form: 'comments',
    enableReinitialize: true
  })(CommentForm)
)
