const knex = require('./connection')
const process = require("process");
knex.schema.hasTable('events').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('events', (table) => {
            table.increments('event_id')
            table.integer('user_id').unsigned().notNullable();
            table.string('event_name')
            table.string('description')
            table.string('city')
            table.date('start_date')
            table.string('end_date')
            table.foreign('user_id').references('id').inTable('register');
            
        })
    }
    else {
        console.log('already created events table');
        process.exit();

    }
})



