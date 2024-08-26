import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamSetting } from "@domain/interfaces/TeamSetting";
import { UUID } from "crypto";

export namespace ICreateTeamRepository {
    export type Request = { 
        id: UUID,
        userId: UUID,
        spaceId: UUID,
        name: string,
        description: string,
        settings: TeamSetting,
        permissions: TeamPermission[],
        memberships: TeamMembership[],
        isDefault: boolean;
    };
    export type Response = Promise<void>;
}

export interface ICreateTeamRepository {
    createTeam(
        team: ICreateTeamRepository.Request
    ): Promise<ICreateTeamRepository.Response>;
}