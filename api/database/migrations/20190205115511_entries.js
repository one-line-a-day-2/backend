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
    entries.timestamp("created_at", true).defaultTo(knex.fn.now());
    entries.text("date", 225).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("entries");
};
