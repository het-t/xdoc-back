import { UUID } from "crypto";
import { BlockPermission } from "./BlockPermission";
import { BlockProperty } from "./BlockProperty";
import { BlockType } from "./BlockType"
import { DbTable } from "./DbTable";
import { BlockFormat } from "./BlockFormat";

export type Block = {
    id: UUID;
    type: BlockType;
    created_by_id: UUID;
    created_time: number;
    last_edited_by_id: UUID;
    last_edited_time: number;
    space_id: UUID;
    alive: boolean;
    properties: Record<string, BlockProperty>;
    format: BlockFormat;
    copied_from?: UUID;
    content: UUID[];
    parent_id: UUID;
    parent_table: DbTable;
    view_ids?: UUID[];
    collection_id?: UUID;
    created_by_table: DbTable;
    last_edited_by_table: DbTable;
    permissions: BlockPermission[];
}