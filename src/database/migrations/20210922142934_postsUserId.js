exports.up = function (knex) {
  return knex.schema.table('posts', function (table) {
    table.uuid('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schmea.table('posts', function (table) {
    table.dropForeign('user_id');

    table.dropColumn('user_id');
  });
};
