import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { IGetSpaceUsersRepository } from "@application/interfaces/repositories/users/IGetSpaceUsersRepository";
import { knexPool } from "../knex/knex";

export class UserRepository implements
    ICreateUserRepository,
    ILoadUserByEmailRepository,
    IGetSpaceUsersRepository
{
    async createUser(
        { email, name, id, password }: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response> {
        return await knexPool("xdoc_user").insert({
            id,
            email,
            password,
            name: name || null
        });
    }

    async loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response> {
        const query = knexPool.select('*')
            .from("xdoc_user")
            .where(`email`, email)
            .where('alive', true)
            .limit(1);
        return (await query);
    }

    async getSpaceUsers(
        { spaceId }: IGetSpaceUsersRepository.Request
    ): Promise<IGetSpaceUsersRepository.Response> {
        const users = (await knexPool.raw(`
            select 
                user_id,
                membership_type
            from space_user_get_by_space_id(?::uuid);
        `, [
            spaceId
        ])).rows;

        return users;
    }
}