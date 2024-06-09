import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { pool } from "../helpers/db-connection";
import { IGetSpaceUsersRepository } from "@application/interfaces/repositories/users/IGetSpaceUsersRepository";

export class UserRepository implements
    ICreateUserRepository,
    ILoadUserByEmailRepository,
    IGetSpaceUsersRepository
{
    async createUser(
        { email, name, id, password }: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response> {
        return await pool("xdoc_user").insert({
            id,
            email,
            password,
            name: name || null
        });
    }

    async loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response> {
        const query = pool.select('*')
            .from("xdoc_user")
            .where(`email`, email)
            .where('alive', true)
            .limit(1);
        return (await query)[0];
    }

    async getSpaceUsers(
        { spaceId }: IGetSpaceUsersRepository.Request
    ): Promise<IGetSpaceUsersRepository.Response> {
        const users = (await pool.raw(`
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