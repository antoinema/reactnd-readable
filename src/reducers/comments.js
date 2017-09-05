import {
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENTS_SUCCESS,
  SUBMIT_COMMENT_SUCCESS,
  VOTE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../actions/comments'

function addEditCommentEntry(state, comment) {
  return {
    ...state,
    [comment.id]: comment
  }
}

export default function commentsById(state = {}, action) {
  const response = action.response
  switch (action.type) {
    case LOAD_COMMENT_SUCCESS:
    case SUBMIT_COMMENT_SUCCESS:
      return addEditCommentEntry(state, response)
    case LOAD_COMMENTS_SUCCESS:
      return response.reduce((comments, comment) => {
        const tempState = addEditCommentEntry(comments, comment)
        return tempState
      }, state)
    case VOTE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          voteScore:
            action.comment.voteScore + (action.direction === 'upVote' ? 1 : -1)
        }
      }
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.id]: {
          ...action.comment,
          deleted: true
        }
      }
    default:
      return state
  }
}
