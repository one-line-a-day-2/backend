// Update with your config settings.s
const localPg = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const dbConnection = process.env.DATABASE_URL || localPg;

const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  production: {
    client: 'pg',
    connection: dbConnection,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './api/database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './api/database/seeds' },
  },
  // development: {
  //   client: 'sqlite3',
  //   connection: { filename: './api/database/auth.db3' }, 
  //   useNullAsDefault: true, // used to avoid warning on console
  //   migrations: {
  //     directory: './api/database/migrations',
  //     tableName: 'dbmigrations',
  //   },
  //   seeds: { directory: './api/database/seeds' },
  // },
};
