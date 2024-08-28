import { UUID } from "crypto";
import { UseCase } from "../UseCase";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamSetting } from "@domain/interfaces/TeamSetting";
import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { SpaceSetting } from "@domain/interfaces/SpaceSetting";

export namespace IGetBlockPermissionsByIds {
    export type Request = {
        ids: UUID[],
        userId: UUID
    };
    export type Response = Array<{
        id: UUID, 
        space_id: UUID,
        block_overriden_permissions?: Record<string, any>,
        space_role: "owner" | "member" | null,
    } & (
        {
            effective_parent_table: "team",
            is_team_default: boolean,
            team_settings: TeamSetting,
            team_memberships: TeamMembership[],     
            team_permissions: TeamPermission[],  
            space_settings: SpaceSetting | null,
        } | {
            effective_parent_table: "xdoc_space",
            space_settings?: SpaceSetting | null,
        }
    )>;
}

export interface IGetBlockPermissionsByIds extends UseCase<
    IGetBlockPermissionsByIds.Request,
    IGetBlockPermissionsByIds.Response
> {
    execute(
        { ids, userId }: IGetBlockPermissionsByIds.Request
    ): Promise<IGetBlockPermissionsByIds.Response>;
}