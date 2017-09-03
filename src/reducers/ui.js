import { combineReducers } from 'redux'

import {
  LOAD_POST_REQUEST,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE
} from '../actions/posts'

function isFetching(state = true, action) {
  switch (action.type) {
    case LOAD_POST_REQUEST:
    case LOAD_POSTS_REQUEST:
      return true
    case LOAD_POSTS_SUCCESS:
    case LOAD_POSTS_FAILURE:
    case LOAD_POST_SUCCESS:
    case LOAD_POST_FAILURE:
      return false
    default:
      return state
  }
}

function errorMessage(state = null, action) {
  const { error } = action
  if (error) {
    return action.error
  }
  return state
}

const ui = combineReducers({
  isFetching,
  errorMessage
})

export default ui
