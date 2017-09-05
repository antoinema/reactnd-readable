import { LOAD_CATEGORIES_SUCCESS } from '../actions/categories'

export default function categories(state = null, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return action.response.categories.reduce(
        (categoriesAccumulator, category) => {
          categoriesAccumulator[category.name] = category
          return categoriesAccumulator
        },
        {}
      )
    default:
      return state
  }
}

export const getCategories = categories => {
  return categories ? Object.keys(categories).map(key => categories[key]) : []
}
