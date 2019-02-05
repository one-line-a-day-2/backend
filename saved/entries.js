
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entries').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('entries').insert([
        {
          "entry": "first entry",
          "user_id": "1"
        },
        {
          "entry": "second entry",
          "user_id": "1"
        },
        {
          "entry": "third entry",
          "user_id": "1"
        },
        {
          "entry": "first entry",
          "user_id": "2"
        },
        {
          "entry": "second entry",
          "user_id": "2"
        },
        {
          "entry": "third entry",
          "user_id": "2"
        },
        {
          "entry": "first entry",
          "user_id": "3"
        },
        {
          "entry": "second entry",
          "user_id": "3"
        },
        {
          "entry": "third entry",
          "user_id": "3"
        },
        
      ]);
    });
};
