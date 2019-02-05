const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const env = process.env.DB_ENV;
const client = knexConfig[env];
module.exports = knex(client);
