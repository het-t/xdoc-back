/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('xdoc_user_auth').del()
  await knex('xdoc_user_auth').insert([
    {
      user_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f", 
      password: "john@123"
    },
    {
      user_id: "c09448fd-6974-4aa5-8d96-9769434287f7", 
      password: "angel@xdoc"
    },
    {
      user_id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a", 
      password: 'JimmyJKPA'
    }
  ]);
};
