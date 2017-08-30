import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import withInitAndSubmit from '../helpers/withInitAndSubmit'

class PostForm extends Component {
  cancel = () => {
    this.props.history.push('/')
  }
  render() {
    const {
      canSubmit,
      isSubmitting,
      validation,
      fields,
      handleInputChange,
      categories,
      handleSubmit
    } = this.props

    return (
      <section className="section">
        <div className="field">
          <label className="label">Author</label>
          <div className="control has-icons-left">
            <input
              className={`input ${validation.author === false
                ? 'is-danger'
                : null}`}
              type="text"
              placeholder="Text input"
              name="author"
              onChange={handleInputChange}
              value={fields.author}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div
              className={`select ${validation.category === false
                ? 'is-danger'
                : null}`}
            >
              <select
                value={fields.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="">Select Category</option>
                {categories.map(category =>
                  <option key={category.path} value={category.name}>
                    {category.name}
                  </option>
                )}{' '}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className={`input ${validation.title === false
                ? 'is-danger'
                : null}`}
              type="text"
              placeholder="Text input"
              onChange={handleInputChange}
              name="title"
              value={fields.title}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div
            className={`control ${validation.body === false
              ? 'is-danger'
              : null}`}
          >
            <textarea
              className="textarea"
              placeholder="Textarea"
              onChange={this.props.handleInputChange}
              name="body"
              value={fields.body}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className={`button is-primary ${isSubmitting
                ? 'is-loading'
                : null}`}
              disabled={!canSubmit}
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
      </section>
    )
  }
}

PostForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object,
  canSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  validation: PropTypes.object,
  fields: PropTypes.object
}

export default withRouter(withInitAndSubmit(PostForm, 'posts'))
