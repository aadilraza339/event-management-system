const knex = require('../../models/connection')
const passwordHash = require('password-hash');
const { server } = require('../../../config/index')
const jwt = require('njwt')


class Event {
    CreateEvent(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, 'top-secret-phrase', (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if(user_role == 'admin' || user_role =='user'){
                    req.body['user_id'] = verifiedJwt['body']['id']
                    req.body['start_date'] = new Date()
                    knex('events')
                    .insert(req.body)
                    .then(()=>{
                        res.send('event create')
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                     
                }
                else{
                    res.send('signup please')
                }
            } else {
                res.send(err.message)
            }
        })
        
      

    }
}

module.exports = exports = new Event()   
