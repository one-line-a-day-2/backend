// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './api/database/auth.db3' }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './api/database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './api/database/seeds' },
  },
};
