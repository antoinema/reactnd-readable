import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ input, label, children, meta: { touched, error } }) => {
  return (
    <div className="field">
      <label className="label">
        {label}
      </label>
      <div className="control">
        <div className={`select ${touched && error && 'is-danger'}`}>
          <select {...input}>
            {children}
          </select>
        </div>
      </div>
      {touched &&
        (error &&
          <p className="help is-danger">
            {error}
          </p>)}
    </div>
  )
}

Select.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired
}

export default Select
