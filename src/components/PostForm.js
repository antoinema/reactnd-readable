import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  cancel = () => {
    this.props.history.push('/')
  }

  render() {
    const { canSubmit, isSubmitting, validation } = this.props
    return (
      <section className="section">
        <div className="field">
          <label className="label">Author</label>
          <div className="control has-icons-left">
            <input
              className={`input ${validation.author == false // we use == as we don't want to show error when undefined (no user input)
                ? 'is-danger'
                : null}`}
              type="text"
              placeholder="Text input"
              name="author"
              onChange={this.props.handleInputChange}
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
              className={`select ${validation.category == false
                ? 'is-danger'
                : null}`}
            >
              <select onChange={this.props.handleInputChange} name="category">
                <option value="">Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className={`input ${validation.title == false
                ? 'is-danger'
                : null}`}
              type="text"
              placeholder="Text input"
              onChange={this.props.handleInputChange}
              name="title"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div
            className={`control ${validation.message == false
              ? 'is-danger'
              : null}`}
          >
            <textarea
              className="textarea"
              placeholder="Textarea"
              onChange={this.props.handleInputChange}
              name="message"
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
              onClick={this.props.handleSubmit}
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
  validation: PropTypes.object
}

export default withRouter(PostForm)
