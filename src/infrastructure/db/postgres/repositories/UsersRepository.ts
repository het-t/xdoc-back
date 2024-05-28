import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { pool } from "../helpers/db-connection";

export class UserRepository implements
    ICreateUserRepository,
    ILoadUserByEmailRepository 
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
}