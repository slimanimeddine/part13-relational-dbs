
const app = require('./server/app.js')
const http = require('http') 
const logger = require('./server/utils/logger.js')
const { connectToDatabase } = require('./server/utils/database.js') 
const { PORT } = require('./server/utils/config.js')

const server = http.createServer(app)

const startServer = async () => {
  try {
    await connectToDatabase()
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.error('error connecting to database:', error)
  }
}

startServer()