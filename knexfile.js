// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  development: {
    // client: 'sqlite3',
    client: 'pg',
    // connection: { filename: './api/database/auth.db3' }, // change this if you want a different name for the database
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './api/database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './api/database/seeds' },
  },
};
