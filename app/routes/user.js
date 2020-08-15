const User = require('../service/Users/User')
const express = require('express')
const user = express.Router()

user.get('/signup', User.signup)


module.exports = user
