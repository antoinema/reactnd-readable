import React from 'react'
import PropTypes from 'prop-types'
import PostContainer from '../containers/PostContainer'

function List({posts}) {
  return (
    <div className="container">    
      {posts.map((post) =>  <PostContainer key={post.id} post={post} />)}
    </div>
  )
}

List.propTypes = {
  posts: PropTypes.array.isRequired
}

export default List
