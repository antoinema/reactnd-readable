import * as ReadableAPI from '../utils/ReadableAPI'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


function requestPosts() {
  return {
    type: REQUEST_POSTS,
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
  return function (dispatch) {
    dispatch(requestPosts())
    return ReadableAPI.getAllPosts().then((posts) => 
      dispatch(receivePosts(posts))
    )
  }
}

export const UPVOTE_REQUEST = 'UPVOTE_REQUEST'
export const UPVOTE_SUCCESS = 'UPVOTE_SUCCESS'
export const DOWNVOTE_REQUEST = 'DOWNVOTE_REQUEST'
export const DOWNVOTE_SUCCESS = 'DOWNVOTE_SUCCESS'

function voteRequest({post, type}) {
  return {
    type: type,
    post: post,
  }
}

function voteSuccess({post, type}) {  
  return {
    type: type === UPVOTE_REQUEST ? UPVOTE_SUCCESS : DOWNVOTE_SUCCESS,
    post: post,    
  }
}

function votePost({post, type}) {
  return function (dispatch) {
    dispatch(voteRequest({post, type}))
    const apiValue = type === UPVOTE_REQUEST ? 'upVote' : 'downVote'
    return ReadableAPI.votePost({post, apiValue}).then(() => 
      dispatch(voteSuccess({post, type}))
    )
  }
}

export function downVote(post) {
  return votePost({
    post,
    type: DOWNVOTE_REQUEST,
  })}

export function upVote(post) {
  return votePost({
    post,
    type: UPVOTE_REQUEST,
  })
}