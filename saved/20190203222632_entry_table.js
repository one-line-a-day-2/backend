exports.up = function(knex) {
    return knex.schema.createTable("entries", entries => {
      entries.increments();
      entries.text("entry", 255).notNullable();
      entries
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
  
      entries.timestamps(true, true);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("entries");
  };