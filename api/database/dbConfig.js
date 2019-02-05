const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const client = knexConfig["production"];
module.exports = knex(client);
