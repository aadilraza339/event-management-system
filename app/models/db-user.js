const knex = require('./connection')
const process = require("process");
knex.schema.hasTable('register').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('register', (table) => {
            table.increments('id')
            table.string('name')
            table.string('email').unique()
            table.string('password')
            table.string('phone_num')
            table.string('user_role')
        })
    }
    else {
        console.log('already created register table');
        process.exit();

    }
})



