import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  cancel = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <section className="section">
        <div className="field">
          <label className="label">Author</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input is-success"
              type="text"
              placeholder="Text input"
              name="author"
              onChange={this.props.handleInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check" />
            </span>
          </div>
          <p className="help is-success">This username is available</p>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select onChange={this.props.handleInputChange} name="category">
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              onChange={this.props.handleInputChange}
              name="title"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <div className="control">
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
              className="button is-primary"
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
  history: PropTypes.object
}

export default withRouter(PostForm)
