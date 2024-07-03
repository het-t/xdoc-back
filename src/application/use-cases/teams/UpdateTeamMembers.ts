import { IAddTeamMembersRepository } from "@application/interfaces/repositories/teams/IAddTeamMembersRepository";
import { IRemoveTeamMembersRepository } from "@application/interfaces/repositories/teams/IRemoveTeamMembersRepository";
import { IUpdateTeamMembers } from "@application/interfaces/use-cases/teams/IUpdateTeamMembers";

export class UpdateTeamMembers implements IUpdateTeamMembers {
    constructor(
        private readonly addTeamMembersRepository: IAddTeamMembersRepository,
        private readonly removeTeamMembersRepository: IRemoveTeamMembersRepository
    ) {}

    async execute(
        {
            spaceId, 
            teamId, 
            newMembersOrGuestsToAdd, 
            existingMembersOrGuestsToRemove, 
            isSettingDefaultTeam,
            addNewMembersToSpace
        }: IUpdateTeamMembers.Request
    ): Promise<IUpdateTeamMembers.Response> {
        if(addNewMembersToSpace && newMembersOrGuestsToAdd?.length) {
            return await this.addTeamMembersRepository.addTeamMembers({
                spaceId,
                teamId,
                newMembersOrGuestsToAdd,
                isSettingDefaultTeam
            });
        }
        else if(existingMembersOrGuestsToRemove?.length) {
            return await this.removeTeamMembersRepository.removeTeamMembers({
                spaceId,
                teamId,
                existingMembersOrGuestsToRemove
            })
        }
    }
}