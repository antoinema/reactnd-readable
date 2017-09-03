import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

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
            <label className="label">Category</label>
            <div className="control">
              <div className="select">
                <Field name="category" component="select">
                  <option value="">Select Category</option>
                  {categories.map(category =>
                    <option key={category.path} value={category.name}>
                      {category.name}
                    </option>
                  )}
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <Field
                type="text"
                placeholder="Text input"
                name="title"
                component="input"
                className="input"
              />
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
    enableReinitialize: true
  })(PostForm)
)
