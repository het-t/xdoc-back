import { UUID } from "crypto";

export namespace ICreateTeam {
    export type Request = {
        createdById: UUID,
        spaceId: UUID,
        name: string,
        description: string,
        isDefault: boolean,
        accessLevel: "closed" 
        | "open" 
        | "default" 
        | "private"
    };
    export type Response = UUID;
}

export interface ICreateTeam {
    execute(
        { createdById, spaceId, name, description, isDefault, accessLevel } : ICreateTeam.Request
    ): Promise<ICreateTeam.Response>
}