import { GetJoinedTeamsByUserId } from "@application/use-cases/teams/GetJoinedTeamsByUserId";
import { TeamRepository } from "@infrastructure/db/postgres/repositories/TeamRepository";

export const makeGetTeams = (): GetJoinedTeamsByUserId => {
    const teamsRepository = new TeamRepository();

    return new GetJoinedTeamsByUserId(teamsRepository);
}