const express = require("express");
const USER = express.Router();


const user  = require("./user")
USER.use("/user", user);


module.exports = USER;