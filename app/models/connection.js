var config = require('../../config/index')
 
var knex = require('knex')(
    {
    client: 'mysql',
    connection: config['database']
  });

module.exports = knex