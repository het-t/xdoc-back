/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("xdoc_user_auth", (table) => {
    table.uuid("user_id")
        .notNullable()
        .primary();
    table.string("password", 60)
        .notNullable();
    table.foreign("user_id")
        .references("id")
        .inTable("xdoc_user");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("xdoc_user_auth");
};
