import * as ReadableAPI from '../utils/ReadableAPI'
import { v1 as uuidv1 } from 'uuid'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(posts) {
  const postsObj = posts.reduce((postsAccumulator, post) => {
    postsAccumulator[post.id] = post
    return postsAccumulator
  }, {})
  return {
    type: RECEIVE_POSTS,
    posts: postsObj,
    receivedAt: Date.now()
  }
}

export function loadPosts() {
  return function(dispatch) {
    dispatch(requestPosts())
    return ReadableAPI.getAllPosts().then(posts =>
      dispatch(receivePosts(posts))
    )
  }
}

export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const LOAD_ITEM_FAILURE = 'LOAD_ITEM_FAILURE'

function requestItem(endPoint) {
  return {
    type: REQUEST_ITEM,
    endPoint
  }
}

function receiveItem(item, endPoint, parentEndPoint) {
  return {
    type: RECEIVE_ITEM,
    item,
    endPoint,
    parentEndPoint,
    receivedAt: Date.now()
  }
}

// Fetches a single item (post, comment) from Readable API unless it is cached.
export function loadItem(itemId, endPoint, parentEndPoint) {
  return (dispatch, getState) => {
    const item = getState().items[endPoint][itemId]
    if (item) {
      return null
    }
    dispatch(requestItem(endPoint))
    return ReadableAPI.getItem(itemId, endPoint).then(data => {
      if (data.error) return dispatch(apiFailure(LOAD_ITEM_FAILURE, data.error))
      return dispatch(receiveItem(data, endPoint, parentEndPoint))
    })
  }
}

export const UPVOTE_REQUEST = 'UPVOTE_REQUEST'
export const UPVOTE_SUCCESS = 'UPVOTE_SUCCESS'
export const DOWNVOTE_REQUEST = 'DOWNVOTE_REQUEST'
export const DOWNVOTE_SUCCESS = 'DOWNVOTE_SUCCESS'

function voteRequest(item, type, endPoint) {
  return {
    type,
    item,
    endPoint
  }
}

function voteSuccess(item, type, endPoint) {
  return {
    type: type === UPVOTE_REQUEST ? UPVOTE_SUCCESS : DOWNVOTE_SUCCESS,
    item,
    endPoint
  }
}

function voteItem(item, type, endPoint) {
  return function(dispatch) {
    dispatch(voteRequest(item, type, endPoint))
    const apiValue = type === UPVOTE_REQUEST ? 'upVote' : 'downVote'
    return ReadableAPI.voteItem(item, apiValue, endPoint).then(() =>
      dispatch(voteSuccess(item, type, endPoint))
    )
  }
}

export function downVote(item, endPoint) {
  return voteItem({
    item,
    endPoint,
    type: DOWNVOTE_REQUEST
  })
}

export function upVote(item, endPoint) {
  return voteItem({
    item,
    endPoint,
    type: UPVOTE_REQUEST
  })
}

export const SUBMIT_ITEM_REQUEST = 'SUBMIT_ITEM_REQUEST'
export const SUBMIT_ITEM_SUCCESS = 'SUBMIT_ITEM_SUCCESS'

function submitItemRequest(fields, endPoint) {
  return {
    type: SUBMIT_ITEM_REQUEST,
    item: fields,
    endPoint
  }
}

function submitItemSuccess(fields, endPoint) {
  return {
    type: SUBMIT_ITEM_SUCCESS,
    item: fields,
    endPoint
  }
}

export function submitItem(fields, endPoint) {
  return function(dispatch) {
    if (fields.id === undefined) {
      const newItem = {
        ...fields,
        id: uuidv1(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false
      }
      dispatch(submitItemRequest(newItem, endPoint))
      return ReadableAPI.submitEditItem(newItem, endPoint).then(
        dispatch(submitItemSuccess(newItem, endPoint))
      )
    } else {
      dispatch(submitItemRequest(fields, endPoint))
      return ReadableAPI.submitEditItem(fields, endPoint).then(
        dispatch(submitItemSuccess(fields, endPoint))
      )
    }
  }
}

function apiFailure(type, error) {
  return {
    type,
    error
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})
