import { UUID } from "crypto"
import { Color } from "./Color";

export type CollectionOption = {
    id: UUID;
    color?: Color;
    value: string;
}