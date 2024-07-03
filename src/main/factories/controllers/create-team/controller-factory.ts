import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { CreateTeamController } from "@infrastructure/http/controllers/create-team/CreateTeamController";
import { makeCreateTeam } from "@main/factories/use-cases/teams/create-team-factory";

export const makeCreateTeamController = (): BaseController => {
    const createTeam = makeCreateTeam();
    return new CreateTeamController(createTeam);
}