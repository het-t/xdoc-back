import { IGetJoinedTeamsByUserIdRepository } from "@application/interfaces/repositories/teams/IGetJoinedTeamsByUserIdRepository";
import { pool } from "../helpers/db-connection";
import { IAddTeamMembersRepository } from "@application/interfaces/repositories/teams/IAddTeamMembersRepository";
import { IRemoveTeamMembersRepository } from "@application/interfaces/repositories/teams/IRemoveTeamMembersRepository";
import { ICreateTeamRepository } from "@application/interfaces/repositories/teams/ICreateTeamRepository";

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
        
        return await pool.raw(query, args);
    }

    async addTeamMembers({ spaceId, teamId, newMembersOrGuestsToAdd, isSettingDefaultTeam }: IAddTeamMembersRepository.Request): Promise<IAddTeamMembersRepository.Response> {
        return await pool("team")
        .where({
            id: teamId,
            space_id: spaceId
        })
        .update({
            "memberships": pool.raw(
                `"memberships" || ?::jsonb`,
                newMembersOrGuestsToAdd
            )
        });
    }

    async removeTeamMembers({ spaceId, teamId, existingMembersOrGuestsToRemove }: IRemoveTeamMembersRepository.Request): Promise<IRemoveTeamMembersRepository.Response> {
        return await pool("team")
        .where({
            id: teamId,
            space_id: spaceId
        })
        .update({
            "memberships": pool.raw(`(
                select jsonb_agg(ele)
                from jsonb_array_elements("memberships") as ele
                where not ele <@ ?::jsonb
            )`, existingMembersOrGuestsToRemove)
        })
    }

    async createTeam({ id, userId, spaceId, isDefault, name, description, settings, permissions, memberships }: ICreateTeamRepository.Request): Promise<ICreateTeamRepository.Response> {
        return pool.raw("call team_create(?, ?, ?, ?, ?, ?::jsonb, ?::jsonb, ?::jsonb, ?)",[
            id,
            userId,
            spaceId,
            name,
            description,
            JSON.stringify(permissions),
            JSON.stringify(memberships),
            settings,
            isDefault
        ])
    }
}