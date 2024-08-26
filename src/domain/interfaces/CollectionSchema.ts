import { UUID } from "crypto";
import { Color } from "./Color";
import { CollectionOption } from "./CollectionOption";

export type CollectionSchema = {
    name: string;
} & (
    {
        type: "select";
        options: {
            id: UUID,
            color: Color,
            value: string
        }[]
    } | {
        type: "multi_select";
        options: CollectionOption[];
    } | {
        type: "status";
        groups: {
            id: UUID;
            name: string;
            color: Color;
            optionsIds: Array<UUID | string>;
        }[];
        options: CollectionOption[];
        defaultOption: string; //default option.value
    } | {
        type: "text";
    } | {
        type: "date";
    } | {
        type: "number";
    } | {
        type: "checkbox";
    } | {
        type: 'person';
    }
)