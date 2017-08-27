import * as ReadableAPI from '../utils/ReadableAPI'

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

export function fetchPosts() {
  return function(dispatch) {
    dispatch(requestPosts())
    return ReadableAPI.getAllPosts().then(posts =>
      dispatch(receivePosts(posts))
    )
  }
}

export const UPVOTE_REQUEST = 'UPVOTE_REQUEST'
export const UPVOTE_SUCCESS = 'UPVOTE_SUCCESS'
export const DOWNVOTE_REQUEST = 'DOWNVOTE_REQUEST'
export const DOWNVOTE_SUCCESS = 'DOWNVOTE_SUCCESS'

function voteRequest({ item, type, endPoint }) {
  return {
    type,
    item,
    endPoint
  }
}

function voteSuccess({ item, type, endPoint }) {
  return {
    type: type === UPVOTE_REQUEST ? UPVOTE_SUCCESS : DOWNVOTE_SUCCESS,
    item,
    endPoint
  }
}

function voteItem({ item, type, endPoint }) {
  return function(dispatch) {
    dispatch(voteRequest({ item, type, endPoint }))
    const apiValue = type === UPVOTE_REQUEST ? 'upVote' : 'downVote'
    return ReadableAPI.voteItem({ item, apiValue, endPoint }).then(() =>
      dispatch(voteSuccess({ item, type, endPoint }))
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
