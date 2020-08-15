const express = require("express");
const event = express.Router();


const user  = require("./user")
event.use("/", user);

const events = require('./event')
event.use('/',events)

module.exports = event;