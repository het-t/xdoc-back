import { UUID } from "crypto"
import { DbTable } from "./DbTable";
import { CollectionFormat } from "./CollectionFormat";
import { CollectionSchema } from "./CollectionSchema";

export type Collection = {
    id: UUID;
    schema: CollectionSchema;
    format: CollectionFormat;
    parent_id: UUID;
    alive: boolean;
    space_id: UUID;
    parent_table: DbTable;
    template_pages: UUID[];
    name: Array<Array<string>>
}