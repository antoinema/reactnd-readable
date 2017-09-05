import * as ReadableAPI from '../utils/ReadableAPI'
import { v1 as uuidv1 } from 'uuid'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export function loadPosts() {
  return {
    // Types of actions to emit before and after
    types: [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: state => !state.posts.allPostsById,
    // Perform the fetching:
    callAPI: () => ReadableAPI.getAllPosts(),
    // Arguments to inject in begin/end actions
    payload: {}
  }
}

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export function loadPost(postId) {
  return {
    types: [LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE],
    shouldCallAPI: state => !state.posts.postsById[postId],
    callAPI: () => ReadableAPI.getPost(postId),
    payload: {}
  }
}

export const SUBMIT_POST_REQUEST = 'SUBMIT_POST_REQUEST'
export const SUBMIT_POST_SUCCESS = 'SUBMIT_POST_SUCCESS'
export const SUBMIT_POST_FAILURE = 'SUBMIT_POST_FAILURE'

export function submitPost(fields) {
  const post =
    fields.id === undefined
      ? {
        ...fields,
        id: uuidv1(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false
      }
      : fields
  const isNew = fields.id === undefined
  return {
    types: [SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE],
    callAPI: () => ReadableAPI.submitPost(post, isNew),
    payload: { fields, isNew }
  }
}

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE'

export function votePost(post, direction) {
  return {
    types: [VOTE_POST_REQUEST, VOTE_POST_SUCCESS, VOTE_POST_FAILURE],
    callAPI: () => ReadableAPI.votePost(post, direction),
    payload: { post, direction }
  }
}

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

export function deletePost(post) {
  return {
    types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
    callAPI: () => ReadableAPI.deletePost(post),
    payload: { post }
  }
}
