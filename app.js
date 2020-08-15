const express = require("express");
const app = express();
const Event = require("./app/routes/index");
app.use(express.json());

const port  = require('./config/index')


app.use("/event", Event);


app.listen(port.server.port||4000,()=>{
    console.log('port runing at..',port.server.port);
    
})