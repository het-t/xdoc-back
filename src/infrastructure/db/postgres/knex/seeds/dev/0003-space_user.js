/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("space_user").del();
  
  await knex('space_user').insert([
    {
      id: "c09448fd-6974-4aa5-8d96-9769434287f7|9503ac1a-4db1-4183-93f1-665f4515fa64",
      user_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
      space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
      membership_type: "owner",
      version: 1,
      invite_id: null
    }, {
      id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a|9503ac1a-4db1-4183-93f1-665f4515fa64",
      user_id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a",
      space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
      membership_type: "member",
      version: 1,
      invite_id: null
    }
  ]);
};
