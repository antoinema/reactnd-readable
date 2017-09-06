import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  SORT_POST_BY_DATE,
  SORT_POST_BY_POPULARITY,
  SORT_POST_BY_VOTES
} from '../actions/ui'
function Categories(props) {
  const handleChange = event => {
    props.onSort(event.target.value)
  }
  return (
    <div className="level-right">
      <p className="level-item">
        {props.current === 'all'
          ? <strong>All</strong>
          : <Link to={'/'} className="is-capitalized">
              All
          </Link>}
      </p>
      {props.categories &&
        props.categories.map(category =>
          <p className="level-item" key={category.name}>
            {category.path === props.current
              ? <strong className="is-capitalized">
                {category.name}
              </strong>
              : <Link
                to={`/category/${category.path}`}
                className="is-capitalized"
              >
                {category.name}
              </Link>}
          </p>
        )}
      <div className="level-item">Sort:</div>
      <div className="level-item">
        <span className="select">
          <select onChange={handleChange}>
            <option value={SORT_POST_BY_DATE}>Date created</option>
            <option value={SORT_POST_BY_VOTES}>Votes</option>
            <option value={SORT_POST_BY_POPULARITY}>Popularity</option>
          </select>
        </span>
      </div>
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.array,
  current: PropTypes.string,
  onSort: PropTypes.func.isRequired
}

export default Categories
