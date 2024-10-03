/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("team").del();
  
  await knex("team").insert([
    {
      id: "e008d30c-2527-4cfd-9c90-2fcd6ac000c5",
      name: "XDoc - Main",
      description: "Teamspace including every member of XDoc",
      is_default: true,
      space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
      created_by_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
      last_edited_by_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
      parent_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
      parent_table: "space",
      membership: JSON.stringify([{
        type: "owner",
        user_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
        entity_type: "user"
      }]),
      permissions: JSON.stringify([{
        role: "editor",
        type: "explicit_team_permission",
        team_id: "e008d30c-2527-4cfd-9c90-2fcd6ac000c5"
      }, {
        role: "editor",
        type: "explicit_team_owner_permission",
        team_id: "e008d30c-2527-4cfd-9c90-2fcd6ac000c5"
      }, {
        role: "editor",
        type: "space_permission",
      }]),
      settings: JSON.stringify({
        visibility: "space_members",
        invite_access: "team_members",
        disable_exports: false,
        disable_public_access: false,
        disable_team_page_edits: false,
        space_member_join_access: "self_join"
      }),
      team_pages: `{"c41966ac-587e-4c8a-8cbb-ed016a333e61", "37d23919-a290-4e52-8f3d-a20a0b83c73b"}`,
      created_time: Date.now(),
      last_edited_time: Date.now(),
      created_by_table: "xdoc_user",
      last_edited_by_table: "xdoc_user"
    }
  ])
};
