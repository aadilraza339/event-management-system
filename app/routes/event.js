const Event = require('../service/Event/Event')
const express = require('express')
const event = express.Router()

event.post('/createEvent', Event.CreateEvent)

event.post('/editEvent/:eventId', Event.EditEvent)

event.delete('/deleteEvent/:eventId', Event.DeleteEvent)

event.get('/usersEvents', Event.usersEvents)

event.get('/events', Event.Search)


module.exports = event
