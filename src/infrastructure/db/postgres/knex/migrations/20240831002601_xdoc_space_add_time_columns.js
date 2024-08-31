/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.table("space", (table)=> {
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
  return knex.schema.alterTable("space", (table) => {
    table.dropColumns(["created_time", "last_edited_time"]);
  })
};
