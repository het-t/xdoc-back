import { TeamMembership } from "@domain/interfaces/TeamMembership";

export namespace IAddTeamMembersRepository {
    export type Request = {
        spaceId: string,
        teamId: string,
        newMembersOrGuestsToAdd: TeamMembership[],
        isSettingDefaultTeam: boolean
    };
    export type Response = Promise<void>;
}

export interface IAddTeamMembersRepository {
    addTeamMembers(
        { spaceId, teamId, newMembersOrGuestsToAdd, isSettingDefaultTeam }: IAddTeamMembersRepository.Request
    ): Promise<IAddTeamMembersRepository.Response>;
} 