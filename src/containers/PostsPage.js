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

import React, { Component } from 'react'

class PostsPage extends Component {
  componentWillMount() {
    const { loadPosts, loadCategories, loadComments } = this.props
    loadPosts().then(() =>
      this.props.posts.forEach(post => loadComments(post.id))
    ) // we load comments to be able to display their number
    loadCategories()
  }

  renderPost = post => {
    if (post.deleted) return
    //if (!post.comment) this.props.loadComments(post.id)
    return <Post key={post.id} post={post} deletePost={this.props.deletePost} />
  }

  render() {
    return (
      <div className="container">
        <PostPageHeader nbPost={this.props.posts.length}>
          <Categories
            categories={this.props.categories}
            current={this.props.category}
          />
        </PostPageHeader>
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
  loadCategories: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    posts: getVisiblePosts(state, 'all')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    loadCategories: () => dispatch(loadCategories()),
    deletePost: data => dispatch(deletePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
