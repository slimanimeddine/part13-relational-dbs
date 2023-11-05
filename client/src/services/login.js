import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}


const loginService = { // loginService object with login function
  login // (no brackets here or invoke, function is sent as a reference)
}

export default loginService


