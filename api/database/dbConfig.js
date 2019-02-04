const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const client = knexConfig.development.pg.connect();
module.exports = knex(client);
