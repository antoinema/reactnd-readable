import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
  return (
    <section>
      <div className="container">
        <p className="has-text-centered has-text-grey-light">
          {props.loadText ? props.loadText : 'Loading'}
        </p>
      </div>
    </section>
  )
}
Loading.propTypes = {
  loadText: PropTypes.string.isRequired
}
export default Loading
