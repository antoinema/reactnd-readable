import * as ReadableAPI from '../utils/ReadableAPI'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

function receiveCategories(categories) {
  const categoriesObj = categories.reduce((categoriesAccumulator, category) => {
    categoriesAccumulator[category.name] = category
    return categoriesAccumulator
  }, {})
  return {
    type: RECEIVE_CATEGORIES,
    categories: categoriesObj,
  }
}

export function fetchCategories() {
  return function (dispatch) {
    dispatch(requestCategories())
    return ReadableAPI.getCategories().then((categories) => 
      dispatch(receiveCategories(categories))
    )
  }
}