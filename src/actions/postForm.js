import * as ReadableAPI from '../utils/ReadableAPI'
import { v1 as uuidv1 } from 'uuid'

export const INPUT_CHANGED = 'INPUT_CHANGED'
export const SUBMIT_POST_REQUEST = 'SUBMIT_POST_REQUEST'
export const SUBMIT_POST_SUCCESS = 'SUBMIT_POST_SUCCESS'
export const NEW_POST = 'NEW_POST'
export const CANCEL_POST = 'CANCEL_POST'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'

export function inputChanged({ fields, validation }) {
  return {
    type: INPUT_CHANGED,
    fields,
    validation
  }
}

function submitPostRequest(fields) {
  return {
    type: SUBMIT_POST_REQUEST,
    post: fields
  }
}

function submitPostSuccess(fields) {
  return {
    type: SUBMIT_POST_SUCCESS,
    post: fields
  }
}

function cancelPostRequest() {
  return {
    type: CANCEL_POST
  }
}
function newPostRequest() {
  return {
    type: NEW_POST
  }
}

function editPostRequest() {
  return {
    type: EDIT_POST_REQUEST
  }
}

function editPostSuccess(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function submitPost(fields) {
  return function(dispatch) {
    const post =
      fields.id === undefined
        ? {
          post: {
            ...fields,
            id: uuidv1(),
            timestamp: Date.now(),
            voteScore: 1,
            deleted: false
          },
          edit: false
        } // new post
        : { post: fields, edit: true } // edit post
    dispatch(submitPostRequest(post))
    return ReadableAPI.submitPost(post).then(dispatch(submitPostSuccess(post)))
  }
}

export function cancelPost() {
  return dispatch => dispatch(cancelPostRequest())
}
export function newPost() {
  return dispatch => dispatch(newPostRequest())
}

export function editPost(postID) {
  return (dispatch, getState) => {
    dispatch(editPostRequest())
    const post = getState().posts.items[postID]
    if (post) {
      return dispatch(editPostSuccess(post))
    } else {
      return ReadableAPI.getPost(postID).then(data =>
        dispatch(editPostSuccess(data))
      )
    }
  }
}
