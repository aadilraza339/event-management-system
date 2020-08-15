const knex = require('../../models/connection')
var passwordHash = require('password-hash');

function hashedPassword(plain) {
  return passwordHash.generate(plain);
}

function ISuser(email) {
  knex('register')
    .where('email', email)
    .then((Isuser) => {
      return ISuser
    })
    .catch((err) => {
      return err
    })

}


class User {
  async signup(req, res) {
    let user = ISuser(req.body.email)
    if (!user) {
      req.body.password = hashedPassword(req.body.password)
      knex('register')
        .insert(req.body)
        .then(() => {
          res.send('signup')
        })
    }
    else{
      res.send('you already signup')
    }
  }

  login(){
    
  }

}

module.exports = exports = new User()   
