import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/logout'


const logout = async (token) => {
  const headers = { // config object, which contains Authorization header
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.delete(baseUrl, headers)
  return response
}


const logoutService = { // logoutService object with logout function
  logout // (no brackets here or invoke, function is sent as a reference)
}

export default logoutService