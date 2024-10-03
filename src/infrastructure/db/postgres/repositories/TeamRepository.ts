import { IGetJoinedTeamsByUserIdRepository } from "@application/interfaces/repositories/teams/IGetJoinedTeamsByUserIdRepository";
import { IAddTeamMembersRepository } from "@application/interfaces/repositories/teams/IAddTeamMembersRepository";
import { IRemoveTeamMembersRepository } from "@application/interfaces/repositories/teams/IRemoveTeamMembersRepository";
import { ICreateTeamRepository } from "@application/interfaces/repositories/teams/ICreateTeamRepository";
import { knexPool } from "../knex/knex";

export class TeamRepository implements 
    IGetJoinedTeamsByUserIdRepository,
    IAddTeamMembersRepository,
    IRemoveTeamMembersRepository,
    ICreateTeamRepository
{
    async getJoinedTeamsByUserId(
        { userId, spaceId }: IGetJoinedTeamsByUserIdRepository.Request
    ): Promise<IGetJoinedTeamsByUserIdRepository.Response> {
        const query = "select * from team_get_by_user_id(?::uuid, ?::uuid);";
        const args = [userId, spaceId];
        
        return await knexPool.raw(query, args);
    }

    async addTeamMembers({ spaceId, teamId, newMembersOrGuestsToAdd, isSettingDefaultTeam }: IAddTeamMembersRepository.Request): Promise<IAddTeamMembersRepository.Response> {
        return await knexPool("team")
        .where({
            id: teamId,
            space_id: spaceId
        })
        .update({
            "membership": knexPool.raw(
                `"membership" || ?::jsonb`,
                newMembersOrGuestsToAdd
            )
        });
    }

    async removeTeamMembers({ spaceId, teamId, existingMembersOrGuestsToRemove }: IRemoveTeamMembersRepository.Request): Promise<IRemoveTeamMembersRepository.Response> {
        return await knexPool("team")
        .where({
            id: teamId,
            space_id: spaceId
        })
        .update({
            "membership": knexPool.raw(`(
                select jsonb_agg(ele)
                from jsonb_array_elements("membership") as ele
                where not ele <@ ?::jsonb
            )`, existingMembersOrGuestsToRemove)
        })
    }

    async createTeam({ id, createdById, spaceId, isDefault, name, description, settings, permissions, membership }: ICreateTeamRepository.Request): Promise<ICreateTeamRepository.Response> {
        return await knexPool.raw("call team_create(?, ?, ?, ?, ?, ?::jsonb, ?::jsonb, ?::jsonb, ?)",[
            id,
            createdById,
            spaceId,
            name,
            description,
            JSON.stringify(permissions),
            JSON.stringify(membership),
            settings,
            isDefault
        ])
    }
}