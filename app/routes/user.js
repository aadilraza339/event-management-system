const User = require('../service/Users/User')
const express = require('express')
const user = express.Router()

user.post('/signup', User.signup)

user.post('/login',User.login)

user.get('/users',User.users)

module.exports = user
