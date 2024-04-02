import { Membership } from "@application/interfaces/strutuctures/IMembership";

export namespace IUpdateTeamMembers {
    export type Request = {
        spaceId: string,
        teamId: string,
        newMembersOrGuestsToAdd?: Membership[],
        existingMembersOrGuestsToRemove?: Membership[],
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