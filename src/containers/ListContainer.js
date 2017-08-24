import { fetchPosts } from '../actions/posts'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from '../components/List'

import React, { Component } from 'react'

class ListContainer extends Component {
  componentDidMount() {
    const { fetchPosts } = this.props
    fetchPosts()
  }
  render() {
    return (
      <section className="section">
        {this.props.isFetching ? 'Loading' : <List posts={this.props.posts} />}
      </section>
    )
  }
}

ListContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired
}

function mapStateToProps({ posts }) {
  const { isFetching, items } = posts
  return {
    isFetching: isFetching,
    posts: items ? Object.keys(items).map(key => items[key]) : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
