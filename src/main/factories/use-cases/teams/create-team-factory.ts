import { CreateTeam } from "@application/use-cases/teams/CreateTeam";
import { TeamRepository } from "@infrastructure/db/postgres/repositories/TeamRepository";

export const makeCreateTeam = (): CreateTeam => {
    const teamRepository = new TeamRepository();

    return new CreateTeam(teamRepository);
}