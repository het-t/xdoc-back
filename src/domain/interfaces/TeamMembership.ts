import { UUID } from "crypto";
import { Role } from "./Role"

export type TeamMembership = {
    type: "owner"
    | "member";
    user_id: UUID;
    entity_type: "user";
}