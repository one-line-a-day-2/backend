const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const client = knexConfig.development.connect();
module.exports = knex(client);
