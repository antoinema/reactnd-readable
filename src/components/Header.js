import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <Link to="/">Readable</Link>
          </h1>
          <h2 className="subtitle">Anonymous content and comments!</h2>
        </div>
      </div>
    </section>
  )
}

export default Header
