
const Dotenv = require('dotenv')
Dotenv.config({ path: `${__dirname}/../.env` });
module.exports = {
    "database":   {
      'host' : process.env.DB_HOST,
      'user' : process.env.DB_USER,
      'password' : process.env.DB_PASS,
      'database' : process.env.DB_NAME
    },
    "server": {
        "port": process.env.SERVER_PORT,
        "jwtSecret": "random-secret-password",
        "jwtExpiration": "72h",

    }
  
}