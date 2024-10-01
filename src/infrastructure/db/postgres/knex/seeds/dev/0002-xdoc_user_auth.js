/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('xdoc_user_auth').truncate()
  await knex('xdoc_user_auth').insert([
    {
      user_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
      password: "$2b$10$Tk85N8bPBO/yE33s5E0VDOZ4KzYwA7Zh7Z4lnx5F1QN6aeOhZGV.G"
    },
    {
      user_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
      password: "$2b$10$Tk85N8bPBO/yE33s5E0VDOZ4KzYwA7Zh7Z4lnx5F1QN6aeOhZGV.G"
    },
    {
      user_id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a",
      password: "$2b$10$Tk85N8bPBO/yE33s5E0VDOZ4KzYwA7Zh7Z4lnx5F1QN6aeOhZGV.G"
    }
  ]);
};
