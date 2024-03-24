import { IUser } from "@domain/entities/IUser";

export namespace ICreateUserRepository {
    export type Request = Omit<IUser, "alive">;
    export type Response = void;
}

export interface ICreateUserRepository {
    createUser(
        userData: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response>
}