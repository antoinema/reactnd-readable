import * as ReadableAPI from '../utils/ReadableAPI'

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

export function loadCategories() {
  return {
    // Types of actions to emit before and after
    types: [
      LOAD_CATEGORIES_REQUEST,
      LOAD_CATEGORIES_SUCCESS,
      LOAD_CATEGORIES_FAILURE
    ],
    shouldCallAPI: state => !state.categories,
    // Perform the fetching:
    callAPI: () => ReadableAPI.getCategories(),
    // Arguments to inject in begin/end actions
    payload: {}
  }
}
