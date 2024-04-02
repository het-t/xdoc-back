import { UpdateTeamMembers } from "@application/use-cases/teams/UpdateTeamMembers";
import { TeamRepository } from "@infrastructure/db/postgres/repositories/TeamRepository";

export const makeUpdateMembersTeam = (): UpdateTeamMembers => {
    const addTeamMembersRepository = new TeamRepository();
    const removeTeamMembersRepository = new TeamRepository();

    return new UpdateTeamMembers(
        addTeamMembersRepository,
        removeTeamMembersRepository
    );
}