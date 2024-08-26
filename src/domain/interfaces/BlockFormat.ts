import { UUID } from "crypto";

export type BlockFormat = {
    page_cover?: string;
    copied_from_pointer?: {
        id: UUID,
        table: "block",
        spaceId: UUID
    };
    page_cover_position?: number;
}