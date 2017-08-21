import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import PropTypes from 'prop-types'
import List from '../components/List'
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import Categories from '../components/Categories'

class App extends Component {
  componentDidMount() {
    const {fetchPosts, fetchCategories} = this.props
    fetchPosts()
    fetchCategories()
  }
  render() {  
    return (
      <div className="app">  
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Readable
              </h1>
              <h2 className="subtitle">
                Anonymous content and comments!
              </h2>
            </div>
          </div>
        </section>    
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
                  <a className="button is-primary">
                    New
                  </a>
                </p>
              </div>
              <div className="level-right">
                <Categories prop={this.props.categories} />
                <div className="level-item">Sort:</div>
                <div className="level-item">
                  <span className="select">
                    <select>
                      <option>Date created</option>
                    </select>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </section>

        <section className="section">
          {this.props.isFetching ? 'Loading'
            : <List posts={this.props.posts} />
          }
        </section>
      </div>



    )
  }
}

function mapStateToProps({posts, categories}) {
  const {isFetching, items} = posts
  return {
    isFetching: isFetching,
    posts: items ? Object.keys(items).map(key => items[key]) : [],
    categories: categories ? Object.keys(categories).map(key => categories[key]) : [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),    
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

