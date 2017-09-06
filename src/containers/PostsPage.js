import { loadPosts, deletePost } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from '../components/List'
import Post from '../components/Post'
import Categories from '../components/Categories'
import PostPageHeader from '../components/PostPageHeader'
import { getVisiblePosts } from '../reducers'
import { getCategories } from '../reducers'
import { withRouter } from 'react-router-dom'
import { loadComments } from '../actions/comments'
import { setSortPostFunction } from '../actions/ui'

import React, { Component } from 'react'

class PostsPage extends Component {
  state = {
    triggerSort: false
  }

  componentWillMount() {
    const { loadPosts, loadCategories, loadComments } = this.props
    loadPosts().then(() =>
      this.props.posts.forEach(post => loadComments(post.id))
    ) // we load comments to be able to display their number
    loadCategories()
  }

  renderPost = post => {
    if (post.deleted) return
    return <Post key={post.id} post={post} deletePost={this.props.deletePost} />
  }

  render() {
    const {
      posts,
      categories,
      category,
      isFetching,
      setSortPostFunction
    } = this.props
    return (
      <div className="container">
        <PostPageHeader nbPost={posts.length}>
          <Categories
            categories={categories}
            current={category}
            onSort={setSortPostFunction}
          />
        </PostPageHeader>
        <List
          renderItem={this.renderPost}
          items={posts}
          isFetching={isFetching}
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
  loadCategories: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  loadComments: PropTypes.func.isRequired,
  setSortPostFunction: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const category = ownProps.match.params.category || 'all'
  const { isFetching } = state.ui
  return {
    posts: getVisiblePosts(state, category),
    categories: getCategories(state),
    isFetching: isFetching,
    category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    loadCategories: () => dispatch(loadCategories()),
    deletePost: data => dispatch(deletePost(data)),
    loadComments: data => dispatch(loadComments(data)),
    setSortPostFunction: data => dispatch(setSortPostFunction(data))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostsPage)
)
