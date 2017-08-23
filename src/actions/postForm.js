import * as ReadableAPI from '../utils/ReadableAPI'

export const INPUT_CHANGED = 'INPUT_CHANGED'
export const SUBMIT_POST_REQUEST = 'SUBMIT_POST_REQUEST'
export const SUBMIT_POST_SUCCESS = 'SUBMIT_POST_SUCCESS'

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

export function submitPost(fields) {
  return function(dispatch) {
    dispatch(submitPostRequest(fields))
    return ReadableAPI.submitPost({ post: fields }).then(apiResponse => {
      console.log(apiResponse)
      dispatch(submitPostSuccess(fields))
    })
  }
}
