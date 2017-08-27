import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from '../components/List'
import Post from '../components/Post'
import PostContainer from '../containers/PostContainer'
import Categories from '../components/Categories'
import { Link } from 'react-router-dom'

import React, { Component } from 'react'

class PostsPage extends Component {
  componentDidMount() {
    const { fetchPosts, fetchCategories } = this.props
    fetchPosts()
    fetchCategories()
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
                  <Link to="/posts/new" className="button is-primary">
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
  fetchPosts: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
