import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { pool } from "../helpers/db-connection";
import { IUser } from "@domain/entities/IUser";

export class UserRepository implements
    ICreateUserRepository,
    ILoadUserByEmailRepository 
{
    async createUser(
        { email, name, id, password }: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response> {
        await pool("xdoc_user").insert({
            id,
            email,
            password,
            name
        });
    }

    loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response> {
        return pool.select('*')
            .from("xdoc_user")
            .where(`email`, email)
            .where('alive', true)
            .limit(1);
    }
}