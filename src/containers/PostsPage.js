import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from '../components/List'
import Post from '../components/Post'
import Categories from '../components/Categories'
import { Link } from 'react-router-dom'
import { getVisiblePosts } from '../reducers'

import React, { Component } from 'react'

class PostsPage extends Component {
  componentWillMount() {
    const { loadPosts, loadCategories } = this.props
    loadPosts()
    loadCategories()
  }

  renderPost(post) {
    return <Post key={post.id} post={post} />
  }

  render() {
    return (
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
                  <Link to="/post/new" className="button is-primary">
                    New
                  </Link>
                </p>
              </div>
              <Categories categories={this.props.categories} />
            </nav>
          </div>
        </section>
        <List
          renderItem={this.renderPost}
          items={this.props.posts}
          isFetching={this.props.isFetching}
        />
      </div>
    )
  }
}

PostsPage.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loadCategories: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    posts: getVisiblePosts(state, 'all')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    loadCategories: () => dispatch(loadCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
