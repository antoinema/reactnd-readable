import * as ReadableAPI from '../utils/ReadableAPI'

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST'
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE'

export function loadComment(commentId) {
  return {
    types: [LOAD_COMMENT_REQUEST, LOAD_COMMENT_SUCCESS, LOAD_COMMENT_FAILURE],
    shouldCallAPI: state => !state.commentsById[commentId],
    callAPI: () => ReadableAPI.getComment(commentId),
    payload: {}
  }
}

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

export function loadComments(postId) {
  return {
    // Types of actions to emit before and after
    types: [
      LOAD_COMMENTS_REQUEST,
      LOAD_COMMENTS_SUCCESS,
      LOAD_COMMENTS_FAILURE
    ],
    // Check the cache (optional):
    shouldCallAPI: state =>
      !state.posts.postsById[postId] || !state.posts.postsById[postId].comments,
    // Perform the fetching:
    callAPI: () => ReadableAPI.getComments(postId),
    // Arguments to inject in begin/end actions
    payload: {}
  }
}

export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE'

export function voteComment(comment, direction) {
  return {
    types: [VOTE_COMMENT_REQUEST, VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE],
    callAPI: () => ReadableAPI.voteComment(comment, direction),
    payload: { comment, direction }
  }
}

export const SUBMIT_COMMENT_REQUEST = 'SUBMIT_COMMENT_REQUEST'
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS'
export const SUBMIT_COMMENT_FAILURE = 'SUBMIT_COMMENT_FAILURE'
// TODO
