import { combineReducers } from 'redux'
import { sortByVote, sortByMoreRecent, sortByMostComments } from '../utils/sort'

import {
  LOAD_POST_REQUEST,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE
} from '../actions/posts'

import { SUBMIT_COMMENT_SUCCESS } from '../actions/comments'

import {
  SHOW_COMMENT_EDIT,
  HIDE_COMMENT_EDIT,
  SET_ERROR_MESSAGE,
  SORT_POST_BY_DATE,
  SORT_POST_BY_POPULARITY,
  SORT_POST_BY_VOTES,
  SET_CURRENT_CATEGORY
} from '../actions/ui'

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

function isEditingComment(state = false, action) {
  switch (action.type) {
    case SHOW_COMMENT_EDIT:
      return true
    case SUBMIT_COMMENT_SUCCESS:
    case HIDE_COMMENT_EDIT:
      return false
    default:
      return state
  }
}

function currentlyEditingComment(state = null, action) {
  switch (action.type) {
    case SHOW_COMMENT_EDIT:
      return action.commentId
    case SUBMIT_COMMENT_SUCCESS:
    case HIDE_COMMENT_EDIT:
      return null
    default:
      return state
  }
}

function errorMessage(state = null, action) {
  const { error } = action
  if (error) {
    return action.error
  }
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.message
    default:
      return state
  }
}

function sortBy(state = SORT_POST_BY_DATE, action) {
  switch (action.type) {
    case SORT_POST_BY_DATE:
      return sortByMoreRecent
    case SORT_POST_BY_VOTES:
      return sortByVote
    case SORT_POST_BY_POPULARITY:
      return sortByMostComments
    default:
      return state
  }
}

function currentCategory(state = '/', action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return action.category
    default:
      return state
  }
}

const ui = combineReducers({
  isFetching,
  errorMessage,
  isEditingComment,
  currentlyEditingComment,
  sortBy,
  currentCategory
})

export default ui
