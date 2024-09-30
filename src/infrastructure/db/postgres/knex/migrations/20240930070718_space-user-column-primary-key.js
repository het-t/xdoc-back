/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("space_user", (table) => {
    table.dropPrimary();

    table.primary("id");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("space_user", (table) => {
    table.dropPrimary();
    table.primary(["space_id", "user_id"]);
  })
};
