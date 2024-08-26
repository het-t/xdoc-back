import { TeamMembership } from "@domain/interfaces/TeamMembership";

export namespace IRemoveTeamMembersRepository {
    export type Request = {
        spaceId: string,
        teamId: string,
        existingMembersOrGuestsToRemove: TeamMembership[]
    };
    export type Response = Promise<void>;
}

export interface IRemoveTeamMembersRepository {
    removeTeamMembers(
        {spaceId, teamId, existingMembersOrGuestsToRemove}: IRemoveTeamMembersRepository.Request
    ): Promise<IRemoveTeamMembersRepository.Response>
}