import { TeamPermissionItem } from "@domain/entities/TeamPermission";

export namespace ICreateTeamRepository {
    export type Request = {
        id: string,
        userId: string,
        spaceId: string,
        name: string,
        description: string,
        isDefault: boolean,
        settings: {
            visibility: string,
            invite_access: string,
            disable_export: boolean,
            disable_guest: boolean,
            disable_public_access: boolean,
            disable_team_page_edits: boolean,
            space_member_join_access: string
        },
        permissions: TeamPermissionItem[],
        memberships: Array<{
            type: string,
            user_id: string,
            entity_type: string
        }>
    };
    export type Response = Promise<void>;
}

export interface ICreateTeamRepository {
    createTeam(
        { id, spaceId, name, description, settings, permissions, memberships }: ICreateTeamRepository.Request
    ): Promise<ICreateTeamRepository.Response>;
}