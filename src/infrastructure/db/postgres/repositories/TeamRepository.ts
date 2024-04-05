import { IGetJoinedTeamsByUserIdRepository } from "@application/interfaces/repositories/teams/IGetJoinedTeamsByUserIdRepository";
import { pool } from "../helpers/db-connection";
import { IAddTeamMembersRepository } from "@application/interfaces/repositories/teams/IAddTeamMembersRepository";
import { IRemoveTeamMembersRepository } from "@application/interfaces/repositories/teams/IRemoveTeamMembersRepository";

export class TeamRepository implements 
    IGetJoinedTeamsByUserIdRepository,
    IAddTeamMembersRepository,
    IRemoveTeamMembersRepository
{
    async getJoinedTeamsByUserId(
        { userId, spaceId }: IGetJoinedTeamsByUserIdRepository.Request
    ): Promise<IGetJoinedTeamsByUserIdRepository.Response> {
        const sp = "select * from xdoc_user_get_joined_teams_by_user_id(?, ?);";
        const args = [userId, spaceId];
        
        return await pool.raw(sp, args);
    }

    async addTeamMembers({ spaceId, teamId, newMembersOrGuestsToAdd, isSettingDefaultTeam }: IAddTeamMembersRepository.Request): Promise<IAddTeamMembersRepository.Response> {
        const sp = "call team_member_add(?, ?, ?)";
        const args = [teamId, spaceId, JSON.stringify(newMembersOrGuestsToAdd)];
        
        return await pool.raw(sp, args);
    }

    async removeTeamMembers({ spaceId, teamId, existingMembersOrGuestsToRemove }: IRemoveTeamMembersRepository.Request): Promise<IRemoveTeamMembersRepository.Response> {
        const sp = "call team_member_remove(?, ?, ?)";
        const args = [teamId, spaceId, JSON.stringify(existingMembersOrGuestsToRemove)];

        return await pool.raw(sp, args);
    }
}