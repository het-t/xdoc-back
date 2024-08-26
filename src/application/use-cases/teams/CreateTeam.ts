import { ICreateTeamRepository } from "@application/interfaces/repositories/teams/ICreateTeamRepository";
import { ICreateTeam } from "@application/interfaces/use-cases/teams/ICreateTeam";
import { Role } from "@domain/interfaces/Role";
import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamPermissionType } from "@domain/interfaces/TeamPermissionType";
import { TeamSetting } from "@domain/interfaces/TeamSetting";

export class CreateTeam implements ICreateTeam {
    constructor(
        private readonly createTeamRepository: ICreateTeamRepository
    ) {}

    async execute(
        { spaceId, userId, name, description, isDefault, accessLevel, id }: ICreateTeam.Request
    ): Promise<ICreateTeam.Response> {
        const settings: TeamSetting = {
            visibility: "space_members",
            invite_access: "team_members",
            disable_export: false,
            disable_public_access: false,
            disable_team_page_edits: false,
            space_member_join_access: "self_join"
        };

        const permissions: Record<TeamPermissionType, Role> = {
            explicit_team_owner_permission: "editor",
            explicit_team_permission: "editor",
            space_permission: "editor"
        };

        const memberships: TeamMembership[] = [{
            type: "owner",
            user_id: userId,
            entity_type: "user"
        }];


        if(accessLevel === "closed") {
            settings.space_member_join_access = "invite_only";
            permissions.space_permission = "none";
        }
        else if (accessLevel === "private") {
            settings.visibility = "team_members";
            settings.space_member_join_access = "invite_only";
            permissions.space_permission = "none";
        }

        const permissionsMapped = [];
        for(const type in permissions) {
            const p: TeamPermission = {
                type: type as TeamPermissionType,
                role: permissions[type as TeamPermissionType],
            };

            if(type !== "space_permission") p.team_id = id;

            permissionsMapped.push(p);
        }
        
        return await this.createTeamRepository.createTeam({
            id,
            userId,
            spaceId,
            name,
            description,
            settings,
            permissions: permissionsMapped,
            memberships,
            isDefault
        });
    }
}

interface IPermission {

}