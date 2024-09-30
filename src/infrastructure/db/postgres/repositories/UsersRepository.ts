import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { IGetSpaceUsersRepository } from "@application/interfaces/repositories/users/IGetSpaceUsersRepository";
import { knexPool } from "../knex/knex";
import { ICreateEmailUserRepository } from "@application/interfaces/repositories/users/ICreateEmailUserRepository";

export class UserRepository implements
    ICreateUserRepository,
    ICreateEmailUserRepository,
    ILoadUserByEmailRepository,
    IGetSpaceUsersRepository
{
    async createUser(
        { email, name, id, password }: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response> {
        return await knexPool("xdoc_user")
        .insert({
            id,
            email,
            name: name || null,
            password
        });
    }

    async createEmailUser(
        { id, email }: ICreateEmailUserRepository.Request
    ): Promise<ICreateEmailUserRepository.Response> {
        return await knexPool("xdoc_user")
        .insert({
            id,
            email
        })
        .returning("id");
    }

    async loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response> {
        return await knexPool.select('*')
        .from("xdoc_user")
        .leftJoin("xdoc_user_auth", function() {
            this.on("xdoc_user.id", "=", "xdoc_user_auth.user_id");
        })
        .where(`email`, email)
        .where('alive', true)
        .limit(1);
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