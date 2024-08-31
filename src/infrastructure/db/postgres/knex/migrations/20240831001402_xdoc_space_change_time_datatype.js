/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.alterTable("space", (table) => {
    table.bigInteger("created_time")
        .notNullable()
        .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));
    table.bigInteger("last_edited_time")
        .notNullable()
        .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    table.dropColumns(["created_time", "last_edited_time"]);

    table.bigInteger("created_time");
    table.bigInteger("last_edited_time");
};
