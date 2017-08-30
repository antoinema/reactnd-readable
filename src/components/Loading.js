import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
  return (
    <section>
      <div className="section">
        <p className="has-text-centered has-text-grey-light">
          {props.children || 'Loading'}
        </p>
      </div>
    </section>
  )
}
Loading.propTypes = {
  children: PropTypes.object
}

export default Loading
