import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import Input from './FormFields/Input'
import Select from './FormFields/Select'
import TextArea from './FormFields/TextArea'

const validate = values => {
  const errors = {}
  if (!values.author) {
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = 'Must be 3 characters or more'
  }
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 9) {
    errors.title = 'Must be 10 characters or more'
  }
  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length < 19) {
    errors.body = 'Must be 20 characters or more'
  }

  if (!values.category) {
    errors.category = 'Required'
  }
  return errors
}

class PostForm extends Component {
  cancel = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const { handleSubmit, categories, submitting } = this.props

    return (
      <section className="section">
        <form onSubmit={handleSubmit}>
          <Field
            name="author"
            label="Author"
            component={Input}
            placeholder="Your name"
          />
          <Field name="category" label="Category" component={Select}>
            <option value="">Select Category</option>
            {categories.map(category =>
              <option key={category.path} value={category.name}>
                {category.name}
              </option>
            )}
          </Field>
          <Field
            name="title"
            label="Title"
            component={Input}
            placeholder="Enter your post title"
          />

          <Field
            name="body"
            label="Message"
            component={TextArea}
            placeholder=""
          />

          <div className="field is-grouped">
            <div className="control">
              <button
                className={`button is-primary ${submitting
                  ? 'is-loading'
                  : null}`}
                disabled={submitting}
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
            <div className="control">
              <button className="button is-link" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default withRouter(
  reduxForm({
    form: 'posts',
    validate,
    enableReinitialize: true
  })(PostForm)
)
