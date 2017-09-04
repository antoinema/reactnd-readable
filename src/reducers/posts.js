import { combineReducers } from 'redux'
import {
  LOAD_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  SUBMIT_POST_SUCCESS,
  VOTE_POST_SUCCESS
} from '../actions/posts'

import {
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENTS_SUCCESS,
  SUBMIT_COMMENT_SUCCESS
} from '../actions/comments'

function addEditPostEntry(state, post) {
  return {
    ...state,
    [post.id]: post
  }
}

function postsById(state = {}, action) {
  const { response } = action
  switch (action.type) {
    case LOAD_POST_SUCCESS:
    case SUBMIT_POST_SUCCESS: {
      const entry = addEditPostEntry(state, response)
      return entry
    }
    case LOAD_POSTS_SUCCESS:
      return response.reduce((posts, post) => {
        return addEditPostEntry(posts, post)
      }, {})
    case VOTE_POST_SUCCESS:
      return {
        ...state,
        [action.post.id]: {
          ...action.post,
          voteScore:
            action.post.voteScore + (action.direction === 'upVote' ? 1 : -1)
        }
      }
    case LOAD_COMMENTS_SUCCESS:
      return response.reduce((newState, comment) => {
        return addComment(newState, comment)
      }, state)
    case LOAD_COMMENT_SUCCESS:
    case SUBMIT_COMMENT_SUCCESS:
      return addComment(state, action.response)

    default:
      return state
  }
}

function addPostId(state, post) {
  return [...new Set([...state, post.id])]
}

function allPostsIds(state = [], action) {
  const { response } = action

  switch (action.type) {
    case SUBMIT_POST_SUCCESS:
      return addPostId(state, response)
    case LOAD_POSTS_SUCCESS:
      return response.map(post => post.id)
    default:
      return state
  }
}

const getAllPosts = state => {
  return state.allPostsIds.map(id => state.postsById[id])
}

export const getVisiblePosts = (state, filter) => {
  const allPosts = getAllPosts(state)
  switch (filter) {
    case 'all':
      return allPosts
    default:
      return allPosts.filter(p => p.category === filter)
  }
}

export const getCommentsForId = (state, postId) => {
  const post = state.posts.postsById[postId]

  return (
    post && post.comments && post.comments.map(id => state.commentsById[id])
  )
}

function addComment(state, comment) {
  const postId = comment.parentId
  const post = state[postId]

  return {
    ...state,
    [postId]: {
      ...post,
      comments: post.comments
        ? [...new Set([...post.comments, comment.id])]
        : [comment.id]
    }
  }
}

const posts = combineReducers({
  postsById,
  allPostsIds
})

export default posts
