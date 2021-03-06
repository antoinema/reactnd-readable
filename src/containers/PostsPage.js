import { loadPosts, deletePost } from '../actions/posts'
import { loadCategories } from '../actions/categories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from '../components/List'
import Post from '../components/Post'
import Categories from '../components/Categories'
import PostPageHeader from '../components/PostPageHeader'
import { getCategories } from '../reducers'
import { withRouter } from 'react-router-dom'
import { loadComments } from '../actions/comments'
import { setSortPostFunction, setCurrentCategory } from '../actions/ui'
import { getVisiblePostsSorted } from '../selectors'

import React, { Component } from 'react'

class PostsPage extends Component {
  state = {
    triggerSort: false
  }

  loadData = categ => {
    // we only load what we need not all the posts unless no categ is chosen
    const { loadPosts, loadComments } = this.props
    loadPosts(categ).then(() =>
      this.props.posts.forEach(post => loadComments(post.id))
    )
  }

  componentDidMount() {
    const { loadCategories, currentCategory } = this.props
    // we load comments to be able to display their number
    loadCategories()
    this.loadData(currentCategory)
  }

  componentWillReceiveProps(newProps) {
    const { setCategory, currentCategory } = this.props
    const newCategory = newProps.match.params.category || '/'
    currentCategory !== newCategory &&
      setCategory(newCategory) &&
      this.loadData(newCategory)
  }

  renderPost = post => {
    if (post.deleted) return
    return <Post key={post.id} post={post} deletePost={this.props.deletePost} />
  }

  render() {
    const {
      posts,
      categories,
      currentCategory,
      isFetching,
      setSortPostFunction,
      setCategory,
      currentSort
    } = this.props
    return (
      <div className="container">
        <PostPageHeader nbPost={posts.length}>
          <Categories
            categories={categories}
            current={currentCategory}
            onSort={setSortPostFunction}
            onClick={setCategory}
            currentPostSort={currentSort}
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
  currentCategory: PropTypes.string.isRequired,
  loadComments: PropTypes.func.isRequired,
  setSortPostFunction: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { isFetching, currentCategory, sortBy } = state.ui
  return {
    posts: getVisiblePostsSorted(state),
    categories: getCategories(state),
    isFetching: isFetching,
    currentCategory,
    currentSort: sortBy.type
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    loadCategories: () => dispatch(loadCategories()),
    deletePost: data => dispatch(deletePost(data)),
    loadComments: data => dispatch(loadComments(data)),
    setSortPostFunction: data => dispatch(setSortPostFunction(data)),
    setCategory: data => dispatch(setCurrentCategory(data))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostsPage)
)
