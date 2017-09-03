import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts, * as fromPosts from './posts'
import ui from './ui'
import categories from './categories'
import commentsById from './comments'

const rootReducer = combineReducers({
  categories,
  form: formReducer,
  posts,
  ui,
  commentsById
})

export default rootReducer

export const getVisiblePosts = (state, filter) =>
  fromPosts.getVisiblePosts(state.posts, filter)

export const getCommentsForId = (state, postId) =>
  fromPosts.getCommentsForId(state, postId)
