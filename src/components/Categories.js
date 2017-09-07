import React from 'react'
import PropTypes from 'prop-types'
import CategoryLink from './CategoryLink'

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
      <CategoryLink
        name="All"
        path="/"
        current={props.current}
        onClick={props.onClick}
        key={'/'}
      />
      {props.categories &&
        props.categories.map(category =>
          <CategoryLink
            name={category.name}
            path={category.path}
            current={props.current}
            onClick={props.onClick}
            key={category.path}
          />
        )}
      <div className="level-item">Sort:</div>
      <div className="level-item">
        <span className="select">
          <select onChange={handleChange} value={props.currentPostSort}>
            <option value={SORT_POST_BY_VOTES}>Votes</option>
            <option value={SORT_POST_BY_DATE}>Date created</option>
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
  onSort: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  currentPostSort: PropTypes.string.isRequired
}

export default Categories
