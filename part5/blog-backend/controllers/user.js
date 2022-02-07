const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username.length < 3) {
    response.status(404).json({
      error: "Username must be at least 3 characters long",
    })
  } else if (body.password.length < 3) {
    response.status(404).json({
      error: "Password must be at least 3 characters long",
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
  }
})

module.exports = usersRouter