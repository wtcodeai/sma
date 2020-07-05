const ApiLink = 'http://localhost:3000/'


function apiRequest (method, path, body) {
  return fetch(`${ApiLink+path}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    } 
  })
  .then(res => {
    return { data: res.json(), headers: res.headers }
  })
}

export const AuthService = {
  getUserData: function (email) {
    return apiRequest('GET',`users?login=${email}`)
  }
}

export const DataService = {
  getPosts: function (page) {
    return apiRequest ('GET', `posts?_page=${page}`)
  },
  getPost: function (id) {
    return apiRequest ('GET', `posts/${id}`)
  },
  createPost: function (id) {
    return apiRequest('POST', 'posts')
  },
  updatePost: function (data) {
    return apiRequest('PATCH', `posts/${data.id}`, data)
  },
  removePost: function (id) {
    return apiRequest('DELETE', `posts/${id}`)
  }
}