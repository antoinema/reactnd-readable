import React from 'react'
import PropTypes from 'prop-types'

const Loading = props => {
  return (
    <section>
      <div className="container">
        <p className="has-text-centered has-text-grey-light">
          {props.children}
        </p>
      </div>
    </section>
  )
}
Loading.propTypes = {
  children: PropTypes.object
}
Loading.defaultPropTypes = {
  children: 'Loading'
}

export default Loading
