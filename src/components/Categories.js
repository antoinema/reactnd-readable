import React from 'react'
import PropTypes from 'prop-types'

function Categories(props) {
  return (
    <div>
      <p className="level-item"><strong>All</strong></p>
      {props.categories && props.categories.map(category => 
        <p className="level-item" key={category.name}><a>{category.name}</a></p>
      )}
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.object,
}

export default Categories
