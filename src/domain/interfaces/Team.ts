import { UUID } from "crypto"
import { DbTable } from "./DbTable";
import { TeamSetting } from "./TeamSetting";
import { TeamPermission } from "./TeamPermission";
import { TeamMembership } from "./TeamMembership";

export type Team = {
    id: UUID;
    space_id: UUID;
    name: string;
    description: string;
    icon: string;
    created_time: number;
    last_edited_time: number;
    created_by_id: UUID;
    last_edited_by_id: UUID;
    created_by_table: DbTable;
    last_edited_by_table: DbTable;
    team_pages: UUID[];
    parent_id: UUID;
    parent_table: DbTable;
    settings: TeamSetting;
    is_default: boolean;
    permissions: TeamPermission[];
    memberships: TeamMembership[];
}