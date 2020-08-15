const express = require("express");
const turing = express.Router();


const user  = require("./user")
turing.use("/user", user);


module.exports = turing;