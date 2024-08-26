import { UUID } from "crypto"

export type User = {
    id: UUID;
    email: string;
    name: string;
    alive: boolean;
}