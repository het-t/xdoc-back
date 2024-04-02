import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { UpdateTeamMembersController } from "@infrastructure/http/controllers/update-team-members/UpdateTeamMembers";
import { makeUpdateMembersTeam } from "@main/factories/use-cases/teams/update-members-team-factory";

export const makeUpdateTeamMembers = (): BaseController => {
    const updateTeamMembersUsecase = makeUpdateMembersTeam();

    return new UpdateTeamMembersController(updateTeamMembersUsecase);
}