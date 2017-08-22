import React from 'react'
import PropTypes from 'prop-types'

function PostForm(props) {
  const { post } = props

  return (
    <section className="section">
      <div className="field">
        <label className="label">Author</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-success"
            type="text"
            placeholder="Text input"
            value="bulma"
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
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea className="textarea" placeholder="Textarea" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary">Post</button>
        </div>
        <div className="control">
          <button className="button is-link">Cancel</button>
        </div>
      </div>
    </section>
  )
}

export default PostForm
