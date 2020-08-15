const User = require('../service/Users/User')
const express = require('express')
const user = express.Router()

user.post('/signup', User.signup)

user.post('/login',User.login)

module.exports = user
