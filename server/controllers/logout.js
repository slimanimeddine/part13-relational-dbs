const logoutRouter = require('express').Router()
const { validateToken } = require('../utils/middleware')

logoutRouter.delete('/', validateToken, async (req, res) => {
  try {
    await req.active_sessions.destroy({
      where: { token: req.active_sessions.token },
    })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'could not logout, try again' })
  }
  
})

module.exports = logoutRouter