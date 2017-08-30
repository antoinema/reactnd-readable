import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  UPVOTE_REQUEST,
  UPVOTE_SUCCESS,
  DOWNVOTE_REQUEST,
  DOWNVOTE_SUCCESS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_ITEM,
  RECEIVE_ITEM,
  LOAD_ITEM_FAILURE,
  RESET_ERROR_MESSAGE
} from '../actions/posts'

import { RECEIVE_CATEGORIES } from '../actions/categories'

import {
  INPUT_CHANGED,
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  NEW_POST,
  EDIT_POST_REQUEST,
  EDIT_POST
} from '../actions/postForm'

// const initialState = {
//   currentCategory: 'frontend',
//   items: {
//     posts: {
//       42: {
//         id: 42,
//         title: 'Confusion about Flux and Relay',
//         comments: [2],
//       },
//       100: {
//         id: 100,
//         title: 'Creating a Simple Application Using React JS and Flux Architecture',
//         comments: null,
//       }
//     },
//     comments: {
//       2: {
//         id: 2,
//         author: 'Andrew',
//         datePosted: 'xxxxxx'
//       }
//     },
//     categories: {
//       Categ_1: {
//         name: 'Categ 1',
//         path: 'Categ_1'
//       }
//     }
//   },
//   postsByCategory: {
//     Categ_1: {
//       isFetching: true,
//       didInvalidate: false,
//       items: []
//     },
//     Categ_2: {
//       isFetching: false,
//       didInvalidate: false,
//       lastDOWNdated: 1439478405547,
//       items: [ 42, 100 ]
//     }
//   }
// }

// function entities(state = { posts: {}, categories: {}, comments:{} }, action) {
//   if (action.response && action.response.entities) {
//     const {posts, categories, comments} = action.response.entities
//     return {
//       ...state,
//       posts,
//       categories,
//       comments,
//     }
//   }
//   return state
// }

function items(
  state = {
    posts: {
      byId: {},
      isFetching: true
    },
    comments: {
      byId: {},
      isFetching: true
    }
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts
      }
    case REQUEST_ITEM:
      return {
        ...state,
        [action.endPoint]: {
          ...state[action.endPoint],
          isFetching: true
        }
      }
    case RECEIVE_ITEM:
      return {
        ...state,
        [action.endPoint]: {
          ...state[action.endPoint],
          byId: {
            ...state[action.endPoint].byId,
            [action.item.id]: action.item
          },
          isFetching: false
        }
      }
    case LOAD_ITEM_FAILURE:
      return {
        ...state,
        [action.endPoint]: {
          ...state[action.endPoint],
          isFetching: false
        }
      }

    case UPVOTE_REQUEST:
    case DOWNVOTE_REQUEST:
      return state
    case UPVOTE_SUCCESS:
      return {
        ...state,
        [action.endPoint]: {
          ...state[action.endPoint],
          byId: {
            ...state[action.endPoint].byId,
            [action.item.id]: {
              ...action.item,
              voteScore: action.item.voteScore + 1
            }
          }
        }
      }
    case DOWNVOTE_SUCCESS:
      return {
        ...state,
        [action.endPoint]: {
          ...state[action.endPoint],
          byId: {
            ...state[action.endPoint].byId,
            [action.item.id]: {
              ...action.item,
              voteScore: action.item.voteScore - 1
            }
          }
        }
      }
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        items: {
          ...state['items'],
          [action.post.id]: {
            ...action.post
          }
        }
      }
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.category]: items(state[action.category], action)
      }
    default:
      return state
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

const initialFormState = {
  fields: { author: '', title: '', body: '', category: '' },
  validation: {},
  isSubmitting: false,
  isFetching: false
}

const initialFormEditState = {
  fields: { author: '', title: '', body: '', category: '' },
  validation: { author: true, title: true, body: true, category: true },
  isSubmitting: false,
  isFetching: true
}

function formPost(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGED:
      return {
        ...state,
        fields: {
          ...state['fields'],
          ...action.fields
        },
        validation: {
          ...state['validation'],
          ...action.validation
        },
        canSubmit: action.canSubmit
      }
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        isSubmitting: true
      }
    case NEW_POST:
      return initialFormState
    case EDIT_POST_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case EDIT_POST:
      return {
        ...initialFormEditState,
        fields: {
          ...state['fields'],
          ...action.post
        },
        isFetching: false
      }
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitted: true
      }
    default:
      return state
  }
}

function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }
  return state
}

const rootReducer = combineReducers({
  items,
  postsByCategory,
  categories,
  formPost,
  errorMessage,
  form: formReducer
})

export default rootReducer
