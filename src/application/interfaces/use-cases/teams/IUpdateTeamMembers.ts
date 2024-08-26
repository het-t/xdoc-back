import { TeamMembership } from "@domain/interfaces/TeamMembership";

export namespace IUpdateTeamMembers {
    export type Request = {
        spaceId: string,
        teamId: string,
        newMembersOrGuestsToAdd?: TeamMembership[],
        existingMembersOrGuestsToRemove?: TeamMembership[],
        isSettingDefaultTeam: boolean,
        addNewMembersToSpace?: boolean
    }
    export type Response = Promise<void>;
}

export interface IUpdateTeamMembers {
    execute(
        membershipData: IUpdateTeamMembers.Request
    ): Promise<IUpdateTeamMembers.Response>
}