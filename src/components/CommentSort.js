import React from 'react'
import PropTypes from 'prop-types'
import { SORT_COMMENTS_BY_DATE, SORT_COMMENTS_BY_VOTES } from '../actions/ui'

const CommentsSort = props => {
  const handleChange = event => {
    props.onSort(event.target.value)
  }

  return (
    <nav className="level is-marginless">
      <div className="level-left" />
      <div className="level-right">
        <div className="level-item">Sort comments:</div>
        <div className="level-item">
          <span className="select">
            <select onChange={handleChange}>
              <option value={SORT_COMMENTS_BY_DATE}>Date created</option>
              <option value={SORT_COMMENTS_BY_VOTES}>Votes</option>
            </select>
          </span>
        </div>
      </div>
    </nav>
  )
}

CommentsSort.propTypes = {
  onSort: PropTypes.func.isRequired
}

export default CommentsSort
