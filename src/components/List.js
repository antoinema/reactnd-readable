import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

function List(props) {
  const { isFetching, items, renderItem } = props

  const isEmpty = items.length === 0
  if (isEmpty && isFetching) {
    return <Loading />
  }

  return (
    <section className="section">
      <div className="container">
        {items.map(renderItem)}
      </div>
    </section>
  )
}

List.propTypes = {
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

List.defaultProps = {
  isFetching: true
}

export default List
