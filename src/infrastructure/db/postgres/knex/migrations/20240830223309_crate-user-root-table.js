/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tableExists = await knex.schema.hasTable("user_root");
   
    if(!tableExists) {
        knex.schema.createTable("user_root", (table) => {
            table.uuid("id")
                .notNullable()
                .primary();
            table.integer("version")
                .notNullable()
                .defaultTo(0);
            table.specificType("left_space", "uuid[]")
                .notNullable()
                .defaultTo(knex.raw("'{}'"));
        })
        .catch(err => console.log(err));
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("user_root");
};
