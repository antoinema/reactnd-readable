import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
import PropTypes from 'prop-types'
import List from '../components/List'
import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import Categories from '../components/Categories'
import PostFormContainer from '../containers/PostFormContainer'
import Header from '../components/Header'
import { Route, Link, withRouter } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    const { fetchPosts, fetchCategories } = this.props
    fetchPosts()
    fetchCategories()
  }
  render() {
    return (
      <div className="app">
        <Route path="/" component={Header} />
        <Route
          exact
          path="/"
          render={() =>
            <div className="container">
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
              <section className="section">
                {this.props.isFetching
                  ? 'Loading'
                  : <List posts={this.props.posts} />}
              </section>
            </div>}
        />
        <Route path="/posts/:type/:id" component={PostFormContainer} />
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  const { isFetching, items } = posts
  return {
    isFetching: isFetching,
    posts: items ? Object.keys(items).map(key => items[key]) : [],
    categories: categories
      ? Object.keys(categories).map(key => categories[key])
      : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
