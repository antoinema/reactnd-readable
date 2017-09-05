export const SHOW_COMMENT_EDIT = 'SHOW_COMMENT_EDIT'
export const HIDE_COMMENT_EDIT = 'HIDE_COMMENT_EDIT'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

export function showCommentEdit(commentId) {
  return {
    type: SHOW_COMMENT_EDIT,
    commentId
  }
}

export function hideCommentEdit() {
  return {
    type: HIDE_COMMENT_EDIT
  }
}

export function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    message
  }
}
