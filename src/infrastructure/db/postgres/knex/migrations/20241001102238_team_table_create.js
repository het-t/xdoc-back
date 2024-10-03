/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("team", (table) => {
        table.uuid('id')
        .primary();

        table.string("name", 100);

        table.string("description", 300);

        table.boolean("is_default")
        .defaultTo(false);

        table.uuid("space_id")
        .notNullable();

        table.uuid("created_by_id")
        .notNullable();

        table.uuid("last_edited_by_id")
        .notNullable();

        table.uuid("parent_id")
        .notNullable();

        table.specificType("parent_table", "xdoc_table")
        .defaultTo("space");

        table.jsonb("memberships")
        .defaultTo([]);

        table.jsonb("permissions")
        .defaultTo([]);

        table.jsonb("settings")
        .defaultTo({});

        table.specificType("team_pages", "uuid[]")
        .defaultTo('{}');

        table.bigInteger("created_time")
        .notNullable()
        .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));

        table.bigInteger("last_edited_time")
        .notNullable()
        .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));

        table.specificType("created_by_table", "xdoc_table")
        .defaultTo("xdoc_user");

        table.specificType("last_edited_by_table", "xdoc_table")
        .defaultTo("xdoc_user");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.dropTableIfExists("team");
};
