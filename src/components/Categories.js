import React from 'react'
import PropTypes from 'prop-types'

function Categories(props) {
  return (          
    <div className="level-right">
      <p className="level-item"><strong>All</strong></p>
      {props.categories && props.categories.map(category => 
        <p className="level-item" key={category.name}><a className="is-capitalized">{category.name}</a></p>
      )}
      <div className="level-item">Sort:</div>
      <div className="level-item">
        <span className="select">
          <select>
            <option>Date created</option>
          </select>
        </span>
      </div>
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.array,
}

export default Categories
