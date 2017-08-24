import React, { Component } from 'react'

class Stats extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="title is-4">
                  <strong>123</strong> posts
                </p>
              </div>
              <p className="level-item">
                <Link to="/posts/create" className="button is-primary">
                  New
                </Link>
              </p>
            </div>
            <Categories categories={this.props.categories} />
          </nav>
        </div>
      </section>
    )
  }
}

export default Stats
