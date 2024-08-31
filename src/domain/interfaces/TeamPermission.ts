import { UUID } from "crypto";
import { Role } from "./Role"

export type TeamPermission = {
    role: Role;
    type: "explicit_team_permission"
    | "explicit_team_owner_permission"
    | "space_permission";
    team_id?: UUID;
}