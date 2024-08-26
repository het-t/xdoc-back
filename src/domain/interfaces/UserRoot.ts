import { UUID } from "crypto"

export type UserRoot = {
    id: UUID;
    space_views: UUID[];
    left_spaces: UUID[];
    space_view_pointers: {
        id: UUID;
        table: "space_view";
        spaceId: UUID
    }[];
}