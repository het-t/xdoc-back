export type TeamSetting = {
    visibility: "space_members"
    | "team_members";
    invite_access: "space_members" 
    | "team_members";
    disable_export: boolean;
    // disable_guests: boolean;
    disable_public_access: boolean;
    disable_team_page_edits: boolean;
    space_member_join_access: "self_join"
    | "invite_only";
}