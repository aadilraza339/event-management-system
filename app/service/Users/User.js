const knex = require('../../models/connection')
const passwordHash = require('password-hash');
const {server} = require('../../../config/index')
const jwt = require('njwt')


function hashedPassword(plain) {
  return passwordHash.generate(plain);
}

function verify(password,hashedPassword){
  return passwordHash.verify(password, hashedPassword)
}

function jwtToken(token_detail){
  return token = jwt.create(token_detail, 'top-secret-phrase')
          token.setExpiration(new Date().getTime() + 60*1000)

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
          let claims = {
            id : isUser[0]['id'],
            user_role : isUser[0]['user_role']
          }
          let token = jwtToken(claims)
          console.log(token.compact());
          
          res.cookie(token.compact())
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

  users(req, res) {
    var token = req.headers.cookie.split(" ")
    token = (token[token.length - 1]).slice(0, -10)
    jwt.verify(token, 'top-secret-phrase', (err, verifiedJwt) => {
        if (!err) {
            let user_role = verifiedJwt['body']['user_role']
            if (user_role == 'admin' ) {
                knex('register')
                    .select('*')
                    .then((alluser) => {
                        res.send(alluser)
                    })
                    .catch((err) => {
                        res.send(err)
                    })

            }
            else {
                res.send('you are not a admin..')
            }
        } else {
            res.send(err.message)
        }
    })
}


}

module.exports = exports = new User()   
