import { UUID } from "crypto"

export type SapceView = {
    id: UUID;
    space_id: UUID;
    bookmarked_pages: UUID[];
    parent_id: UUID;
    parent_table: "user_root";
    alive: boolean;
    private_pages: UUID[];
    joined_teams: UUID[];
    settings: object;
    sidebar_order: Array<"favorites" | "teamspaces" | "shared" | "private">
}