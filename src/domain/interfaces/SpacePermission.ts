import { UUID } from "crypto";
import { Role } from "./Role"

export type SpacePermission = {
    role: Role;
    type: "user_permission";
    user_id: UUID;
}