require('dotenv').config() 

const PORT = process.env.PORT || 3001 // port number from .env file

const DATABASE_URL = process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const SECRET = process.env.SECRET
  
module.exports = {
  DATABASE_URL,
  PORT,
  ALLOWED_ORIGINS,
  REACT_APP_BACKEND_URL,
  SECRET
}