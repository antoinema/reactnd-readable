import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts from './posts'
import ui from './ui'
import categories, * as fromCategories from './categories'
import commentsById from './comments'

const rootReducer = combineReducers({
  categories,
  form: formReducer,
  posts,
  ui,
  commentsById
})

export default rootReducer

export const getCategories = state =>
  fromCategories.getCategories(state.categories)
