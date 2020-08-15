const Event = require('../service/Event/Event')
const express = require('express')
const event = express.Router()

event.post('/CreateEvent', Event.CreateEvent)

// user.post('/login',User.login)

module.exports = event
