import { IDbResponse } from "@application/interfaces/db/IDbResponse";
import { SpaceSetting } from "@domain/interfaces/SpaceSetting";
import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamSetting } from "@domain/interfaces/TeamSetting";
import { UUID } from "crypto";

export namespace IGetBlockPermissionsByIdsRepository {
    export type Request = {
        ids: string[],
        userId: string
    };
    export type Response = IDbResponse<Array<{
        id: UUID, 
        space_id: UUID,
        effective_parent_table: "team" | "xdoc_space",
        team_permissions: TeamPermission[], 
        is_team_default: boolean,
        team_settings: TeamSetting,
        team_memberships: TeamMembership[], 
        space_role: "owner" | "member", 
        space_settings: SpaceSetting,
        block_overriden_permissions: Record<string, any>
    }>> | Error;
}

export interface IGetBlockPermissionsByIdsRepository {
    getBlockPermissionsByIds(
        { ids }: IGetBlockPermissionsByIdsRepository.Request
    ): Promise<IGetBlockPermissionsByIdsRepository.Response>;
}