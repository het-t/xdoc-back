
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("xdoc_space", (table) => {
    table.uuid("id")
        .notNullable()
        .primary();
    table.integer("subscription_tier_id")
        .notNullable()
        .defaultTo(1);
    table.text("name")
        .notNullable();
    table.timestamp("created_time");
    table.timestamp("last_edited_time");
    table.uuid("created_by_id");
    table.uuid("last_edited_by_id");
    table.integer("plan_type_id");
    table.specificType("created_by_table", "xdoc_table");
    table.specificType("last_edited_by_table", "xdoc_table");
    table.jsonb("settings")
        .defaultTo({})
        .notNullable();
    table.specificType("pages", "uuid[]")
        .defaultTo(knex.raw("'{}'"))
        .notNullable();
    table.jsonb("permissions")
        .defaultTo({})
        .notNullable();
  })
  .catch(err => console.log(err))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.raw("drop table xdoc_space");
};
