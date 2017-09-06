import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ input, label, placeholder, meta: { touched, error } }) => {
  return (
    <div className="field">
      <label className="label">
        {label}
      </label>
      <div className="control has-icons-right">
        <textarea
          className={`textarea ${touched && (error && 'is-danger')}`}
          placeholder={placeholder}
          {...input}
        />
        {touched &&
          (error &&
            <span className="icon is-small is-right">
              <i className="fa fa-warning" />
            </span>)}
      </div>
      {touched &&
        (error &&
          <p className="help is-danger">
            {error}
          </p>)}
    </div>
  )
}

TextArea.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
}

export default TextArea
