import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamSetting } from "@domain/interfaces/TeamSetting";
import { UUID } from "crypto";

export namespace ICreateTeamRepository {
    export type Request = { 
        id: UUID,
        createdById: UUID,
        spaceId: UUID,
        name: string,
        description: string,
        settings: TeamSetting,
        permissions: TeamPermission[],
        memberships: TeamMembership[],
        isDefault: boolean;
    };
    export type Response = UUID;
}

export interface ICreateTeamRepository {
    createTeam(
        { id, createdById, spaceId, name, description, settings, permissions, memberships, isDefault }: ICreateTeamRepository.Request
    ): Promise<ICreateTeamRepository.Response>;
}