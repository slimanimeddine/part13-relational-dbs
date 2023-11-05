require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readinglistRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')
const { headers, unknownEndpoint, errorHandler } = require('./utils/middleware')



app.use(headers) // use headers middleware

app.use(cors({ // use cors for cross origin requests
  origin: config.ALLOWED_ORIGINS, // allow requests from these origins
})) 

app.use(express.json()) // use express json parser for returning json


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build')) // serve static files from build folder
}


// routers
app.use('/api/login', loginRouter)

app.use('/api/users', userRouter)

app.use('/api/authors', authorRouter)

app.use('/api/blogs', blogRouter)

app.use('/api/readinglists', readinglistRouter)

app.use('/api/logout', logoutRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app