/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('space').del()
  await knex('space').insert([
    {
      id: "9503ac1a-4db1-4183-93f1-665f4515fa64", 
      subscription_tier_id: 1,
      name: "Heaven Homes",
      created_time: 1725113868315,
      last_edited_time: 1725113868315,
      created_by_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
      last_edited_by_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
      plan_type_id: 1,
      created_by_table: "xdoc_user",
      last_edited_by_table: "xdoc_user",
      settings: {},
      pages: [],
      permissions: []
    }
  ]);
};