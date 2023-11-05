import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null // token variable

const setToken = newToken => { // function for setting token
  token = `bearer ${newToken}` // set token to variable
}


const getAll = async () => { // function for getting all blogs
  const response = await axios.get(baseUrl)
  return response.data
}


const create = async newObject => { // function for creating a new blog
  const config = { // config object, which contains Authorization header, sent as third parameter in axios.post request
    headers: { Authorization: token }, // set token to Authorization header
  }

  const response = await axios.post(baseUrl, newObject, config) // send post request to backend with newObject and config
  return response.data
}



const update = async (id, newObject) => { // function for updating a blog
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => { // function for deleting a blog
  const config = { // config object, which contains Authorization header, sent as third parameter in axios.delete request
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}


const blogsService = {
  getAll, // (no brackets here or invoke, function is sent as a reference)
  create,
  update,
  deleteBlog,
  setToken
}

export default blogsService