import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import withInitAndSubmit from '../helpers/withInitAndSubmit'

const CommentForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">First Name</label>
        <Field name="author" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="body">Last Name</label>
        <Field name="body" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default withInitAndSubmit(
  reduxForm({
    form: 'comments',
    enableReinitialize: true
  })(CommentForm),
  'comments'
)
