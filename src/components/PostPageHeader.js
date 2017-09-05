import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Stats extends Component {
  static propTypes = {
    nbPost: PropTypes.number.isRequired,
    children: PropTypes.node
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
                <Link to="/post/new" className="button is-primary">
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

export default Stats
