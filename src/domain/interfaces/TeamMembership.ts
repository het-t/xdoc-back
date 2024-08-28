import { UUID } from "crypto";

export type TeamMembership = {
    type: "owner"
    | "member";
    user_id: UUID;
    entity_type: "user";
}