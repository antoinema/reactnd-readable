export const SHOW_COMMENT_EDIT = 'SHOW_COMMENT_EDIT'
export const HIDE_COMMENT_EDIT = 'HIDE_COMMENT_EDIT'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const SORT_POST_BY_DATE = 'SORT_POST_BY_DATE'
export const SORT_POST_BY_POPULARITY = 'SORT_POST_BY_POPULARITY'
export const SORT_POST_BY_VOTES = 'SORT_POST_BY_VOTES'
export const SET_CURRENT_CATEGORY = 'SET_CATEGORY'

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

export function setSortPostFunction(sortBy) {
  return {
    type: sortBy
  }
}

export function setCurrentCategory(category) {
  return {
    type: SET_CURRENT_CATEGORY,
    category
  }
}
