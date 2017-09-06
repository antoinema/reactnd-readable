import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CategoryLink = props => {
  const { path, name, onClick, current, to } = props
  const handleOnClick = () => {
    onClick(path)
  }
  return (
    <p className="level-item" key={name}>
      {path === current
        ? <strong className="is-capitalized">
          {name}
        </strong>
        : <Link to={to} className="is-capitalized" onClick={handleOnClick}>
          {name}
        </Link>}
    </p>
  )
}

CategoryLink.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

export default CategoryLink
