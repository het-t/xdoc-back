import { Membership } from "@application/interfaces/strutuctures/IMembership";

export namespace IAddTeamMembersRepository {
    export type Request = {
        spaceId: string,
        teamId: string,
        newMembersOrGuestsToAdd: Membership[],
        isSettingDefaultTeam: boolean
    };
    export type Response = Promise<void>;
}

export interface IAddTeamMembersRepository {
    addTeamMembers(
        { spaceId, teamId, newMembersOrGuestsToAdd, isSettingDefaultTeam }: IAddTeamMembersRepository.Request
    ): Promise<IAddTeamMembersRepository.Response>;
} 