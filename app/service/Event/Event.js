const knex = require('../../models/connection')
const passwordHash = require('password-hash');
const { server } = require('../../../config/index')
const jwt = require('njwt')


class Event {
    CreateEvent(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, server.jwtSecret, (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if (user_role == 'admin' || user_role == 'user') {
                    req.body['user_id'] = verifiedJwt['body']['id']
                    req.body['start_date'] = new Date()
                    knex('events')
                        .insert(req.body)
                        .then(() => {
                            res.send('event create')
                        })
                        .catch((err) => {
                            res.send(err)
                        })

                }
                else {
                    res.send('signup please')
                }
            } else {
                res.send(err.message)
            }
        })
    }
    EditEvent(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, server.jwtSecret, (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if (user_role == 'admin' || user_role == 'user') {
                    req.body['user_id'] = verifiedJwt['body']['id']
                    req.body['start_date'] = new Date()
                    knex('events')
                        .update(req.body)
                        .where('event_id', req.params.eventId)
                        .then(() => {
                            res.send('updated event detail')
                        })
                        .catch((err) => {
                            res.send(err)
                        })

                }
                else {
                    res.send('signup please')
                }
            } else {
                res.send(err.message)
            }
        })
    }

    DeleteEvent(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, server.jwtSecret, (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if (user_role == 'admin' || user_role == 'user') {
                    req.body['user_id'] = verifiedJwt['body']['id']
                    req.body['start_date'] = new Date()
                    knex('events')
                        .select('*')
                        .where('user_id', verifiedJwt['body']['id'])
                        .then((events) => {
                            if (events.length) {
                                knex.select('*').from('events').havingIn('user_id', verifiedJwt['body']['id'])
                                    .where('event_id', req.params.eventId)
                                    .delete()
                                    .then((if_Id) => {
                                        if (if_Id) {
                                            res.send('DELETE EVENT...')
                                        }
                                        else {
                                            res.send('This id is not exists')
                                        }

                                    })
                                    .catch((err) => {
                                        res.send(err.message)
                                    })

                            }
                            else {
                                res.send('you did not create any event')
                            }
                        })
                        .catch((err) => {
                            res.send(err)
                        })

                }
                else {
                    res.send('signup please')
                }
            } else {
                res.send(err.message)
            }
        })
    }

    Events(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(token, server.jwtSecret, (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if (user_role == 'admin') {
                    knex('register')
                        .select('user_id', 'name', 'email', 'phone_num', 'event_name', 'description', 'city', 'start_date', 'end_date')
                        .join('events', 'user_id', '=', 'register.id')
                        .then((all_User_Event) => {
                            res.send(all_User_Event)
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send('you are not a admin..!')
                }
            } else {
                res.send(err.message)
            }
        })
    }

    usersEvents(req, res) {
        var token = req.headers.cookie.split(" ")
        token = (token[token.length - 1]).slice(0, -10)
        jwt.verify(cookie, server.jwtSecret, (err, verifiedJwt) => {
            if (!err) {
                let user_role = verifiedJwt['body']['user_role']
                if (user_role == 'admin') {
                    knex('register')
                        .select('user_id', 'name', 'email', 'phone_num', 'event_name', 'description', 'city', 'start_date', 'end_date')
                        .join('events', 'user_id', '=', 'register.id')
                        .then((all_User_Event) => {
                            res.send(all_User_Event)
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send('you are not a admin..!')
                }
            } else {
                res.send(err.message)
            }
        })
    }

    Search(req, res) {
        let name = req.query.name
        let city = req.query.city
        if (name != "") {
            if (city != "") {
                knex('events')
                    .where('event_name', "like", "%" + name + "%")
                    .andWhere('city', "like", city).orderBy('event_name', "like",  "%" + name + "%")
                    .then((event_search) => {
                        if (event_search.length) {
                            res.send(event_search)
                        }
                        else {
                            res.send('events not found')
                        }
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }
            else {
                knex('events')
                    .where('event_name', "like",  "%" + name + "%")
                    .then((event_search) => {
                        if (event_search.length) {
                            res.send(event_search)
                        }
                        else {
                            res.send('events not found')
                        }
                    })
            }
        }
        else {
            knex('events')
            .where('city', "like",  "%" + city + "%")
            .then((event_search) => {
                if (event_search.length) {
                    res.send(event_search)
                }
                else {
                    res.send('events not found')
                }
            })
        }
    }

}

module.exports = exports = new Event()   
