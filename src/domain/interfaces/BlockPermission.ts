import { UUID } from "crypto";
import { Role } from "./Role";

export type BlockPermission = {
    role: Role;
    type: "user_permission";
    user_id: UUID;
}