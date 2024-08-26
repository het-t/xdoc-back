import { UUID } from "crypto";

export namespace ICreateTeam {
    export type Request = {
        id: UUID,
        userId: UUID,
        spaceId: UUID,
        name: string,
        description: string,
        isDefault: boolean,
        accessLevel: "closed" 
        | "open" 
        | "default" 
        | "private"
    };
    export type Response = Promise<void>;
}

export interface ICreateTeam {
    execute(
        teamData: ICreateTeam.Request
    ): Promise<ICreateTeam.Response>
}