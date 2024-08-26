import { UUID } from "crypto";
import { UseCase } from "../UseCase";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamSetting } from "@domain/interfaces/TeamSetting";
import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { SpaceSetting } from "@domain/interfaces/SpaceSetting";

export namespace IGetBlockPermissionsByIds {
    export type Request = {
        ids: string[],
        userId: string
    };
    export type Response = Array<{
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
    }>;
}

export interface IGetBlockPermissionsByIds extends UseCase<
    IGetBlockPermissionsByIds.Request,
    IGetBlockPermissionsByIds.Response
> {
    execute(
        { ids, userId }: IGetBlockPermissionsByIds.Request
    ): Promise<IGetBlockPermissionsByIds.Response>;
}