const api = 'http://localhost:5001'

// Generate a unique token for indentifying the backend server.
let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token
}

export const getPost = postId => fetch(`${api}/posts/${postId}`, { headers })
export const getAllPosts = () => fetch(`${api}/posts`, { headers })

export const getComment = commentId =>
  fetch(`${api}/comments/${commentId}`, { headers })

export const votePost = (post, direction) => voteItem(post, direction, 'posts')
export const voteComment = (comment, direction) =>
  voteItem(comment, direction, 'comments')

const voteItem = (item, apiValue, endPoint) =>
  fetch(`${api}/${endPoint}/${item.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: apiValue
    })
  })

export const submitPost = (post, isNew) => {
  const method = isNew ? 'POST' : 'PUT'
  const url = !isNew ? `${api}/posts/${post.id}` : `${api}/posts`
  return fetch(url, {
    headers,
    method: method,
    body: JSON.stringify(post)
  })
}
export const getCategories = () => fetch(`${api}/categories`, { headers })

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
