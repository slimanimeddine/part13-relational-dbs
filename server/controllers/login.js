const loginRouter = require('express').Router()
const { User, ActiveSession } = require('../models')

loginRouter.post('/', async (request, response) => {
  

  const { username, password } = request.body

  const user = await User.findOne({ where: { username } })

  const passwordCorrect = user === null
    ? false
    : password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact an administrator'
    })
  }

  console.log(`user: ${JSON.stringify(user, null, 2)}`)

  const token = await user.generateToken()
  await ActiveSession.create({ token: token, userId: user.id })


  return response.status(200).send({
    token: token,
    username: user.username,
    name: user.name,
  })

})

module.exports = loginRouter