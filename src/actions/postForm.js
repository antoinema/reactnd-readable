import * as ReadableAPI from '../utils/ReadableAPI'

export const INPUT_CHANGED = 'INPUT_CHANGED'
export const SUBMIT_POST_REQUEST = 'SUBMIT_POST_REQUEST'
export const SUBMIT_POST_SUCCESS = 'SUBMIT_POST_SUCCESS'
export const NEW_POST = 'NEW_POST'
export const CANCEL_POST = 'CANCEL_POST'
export const EDIT_POST = 'EDIT_POST'

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

function editPostRequest(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function submitPost(fields) {
  return function(dispatch) {
    dispatch(submitPostRequest(fields))
    return ReadableAPI.submitPost({ post: fields }).then(
      dispatch(submitPostSuccess(fields))
    )
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
    const post = getState().posts.items[postID]
    if (post) {
      return dispatch(editPostRequest(post))
    } else {
      return ReadableAPI.getPost(postID).then(data =>
        dispatch(editPostRequest(data))
      )
    }
  }
}
