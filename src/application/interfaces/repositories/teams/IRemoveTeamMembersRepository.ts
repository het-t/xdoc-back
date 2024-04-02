import { Membership } from "@application/interfaces/strutuctures/IMembership"

export namespace IRemoveTeamMembersRepository {
    export type Request = {
        spaceId: string,
        teamId: string,
        existingMembersOrGuestsToRemove: Membership[]
    };
    export type Response = Promise<void>;
}

export interface IRemoveTeamMembersRepository {
    removeTeamMembers(
        {spaceId, teamId, existingMembersOrGuestsToRemove}: IRemoveTeamMembersRepository.Request
    ): Promise<IRemoveTeamMembersRepository.Response>
}