import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class Stats extends Component {
  static propTypes = {
    nbPost: PropTypes.number.isRequired,
    children: PropTypes.node,
    location: PropTypes.object
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="title is-4">
                  <strong>{this.props.nbPost}</strong> posts
                </p>
              </div>
              <p className="level-item">
                <Link
                  className="button is-primary"
                  to={{
                    pathname: '/post/new',
                    state: { from: this.props.location.pathname }
                  }}
                >
                  New
                </Link>
              </p>
            </div>
            {this.props.children}
          </nav>
        </div>
      </section>
    )
  }
}

export default withRouter(Stats)
