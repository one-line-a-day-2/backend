
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users.string('password', 255).notNullable();
      users.string('firstname', 255).notNullable();
      users.string('lastname', 255).notNullable();
      users.timestamp(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
