const api = 'http://localhost:5001'

// Generate a unique token for indentifying the backend server.
let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token
}

function handleErrors(response) {
  if (response.ok) {
    return response
  }
  throw Error(response.statusText || 'Something bad happened')
}

export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers }).then(res => res.json())

export const getItem = (itemId, endPoint) => {
  console.log(`call to API: ${endPoint}:${itemId}`)

  return fetch(`${api}/${endPoint}/${itemId}`, { headers })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      return { error: error.message }
    })
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json())

export const voteItem = (item, apiValue, endPoint) =>
  fetch(`${api}/${endPoint}/${item.id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: apiValue
    })
  })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      return { error: error.message }
    })

export const getCategories = () =>
  fetch(`${api}/categories`, { headers }).then(res =>
    res.json().then(res => res.categories)
  )

export const submitPost = ({ post, edit }) => {
  const method = edit ? 'PUT' : 'POST'
  const id = edit ? post.id : null
  return fetch(`${api}/posts/${id}`, {
    headers,
    method: method,
    body: JSON.stringify(post)
  }).then(response => response.json())
}

export const submitNewItem = (item, endPoint) => {
  return fetch(`${api}/${endPoint}/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(item)
  })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      return { error: error.message }
    })
}

export const submitEditItem = (item, endPoint) => {
  const id = item.id
  return fetch(`${api}/${endPoint}/${id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(item)
  })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => {
      return { error: error.message }
    })
}
