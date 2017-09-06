import { createSelector } from 'reselect'

const getCategory = state => state.ui.currentCategory
const getAllPosts = state => {
  return state.posts.allPostsIds.map(id => state.posts.postsById[id])
}
export const getVisiblePosts = createSelector(
  [getCategory, getAllPosts],
  (currentCategory, allPosts) => {
    switch (currentCategory) {
      case '/': // all posts
        return allPosts.filter(p => !p.deleted)
      default:
        return allPosts.filter(
          p => !p.deleted && p.category === currentCategory
        )
    }
  }
)

const getSortBy = state => state.ui.sortBy

export const getVisiblePostsSorted = createSelector(
  [getVisiblePosts, getSortBy],
  (visiblePosts, sortBy) => visiblePosts.sort(sortBy)
)
