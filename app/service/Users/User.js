const knex = require('../../models/connection')
const passwordHash = require('password-hash');
const {server} = require('../../../config/index')
const jwt = require('jsonwebtoken');


function hashedPassword(plain) {
  return passwordHash.generate(plain);
}

function verify(password,hashedPassword){
  return passwordHash.verify(password, hashedPassword)
}

function jwtToken(token_detail){
  console.log(token_detail);
  
  return jwt.sign(token_detail
  , 'secret', { expiresIn: '1h' });

}

class User {
   signup(req, res) {
    knex('register')
      .select('email')
      .where('email', req.body.email)
      .then((isUser) => {
        if (!isUser.length) {
          req.body.password = hashedPassword(req.body.password)
          knex('register')
            .insert(req.body)
            .then(() => {
              res.send('signup')
            })

        }
        else {
          res.send('you already signup')
        }

      })
    
  }

   login(req, res) {
    knex('register')
    .select('*')
    .where('email', req.body.email) 
    .then((isUser) => {
      if (isUser.length) {
        let check = verify(req.body.password, isUser[0]['password'])
        if(check){
          let data = {
            id : isUser[0]['id'],
            user_role : isUser[0]['user_role']
          }
          let jwt_Token  = jwtToken(data)
          console.log(jwt_Token);
          
          res.cookie(jwt_Token)
          res.send('loing successful')
        }
        else{
          console.log('incorrect password');
          
        }
        
        
      }
      else {
        res.send('invaild email')
      }

    })
    
  }


}

module.exports = exports = new User()   
