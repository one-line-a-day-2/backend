///
const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const client = knexConfig["development"];
module.exports = knex(client);
