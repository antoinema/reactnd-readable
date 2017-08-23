const api = 'http://localhost:5001'

// Generate a unique token for indentifying the backend server.
let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token
}

export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json())

export const votePost = ({ post, apiValue }) =>
  fetch(`${api}/posts/${post.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: apiValue
    })
  }).then(response => response.json())

export const getCategories = () =>
  fetch(`${api}/categories`, { headers }).then(res =>
    res.json().then(res => res.categories)
  )

export const submitPost = ({ post }) =>
  fetch(`${api}/posts/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(post)
  }).then(response => response.json())
