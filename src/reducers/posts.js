import { combineReducers } from 'redux'
import {
  LOAD_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  SUBMIT_POST_SUCCESS,
  VOTE_POST_SUCCESS,
  DELETE_POST_SUCCESS
} from '../actions/posts'

import {
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENTS_SUCCESS,
  SUBMIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
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
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        [action.post.id]: {
          ...action.post,
          deleted: true
        }
      }
    case LOAD_COMMENTS_SUCCESS:
      return response.reduce((newState, comment) => {
        return addComment(newState, comment)
      }, state)
    case LOAD_COMMENT_SUCCESS:
    case SUBMIT_COMMENT_SUCCESS:
      return addComment(state, action.response)
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          comments: state[action.comment.parentId].comments.filter(item => {
            return item !== action.comment.id
          })
        }
      }
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
