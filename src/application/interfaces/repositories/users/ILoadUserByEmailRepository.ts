import { IUser } from "@domain/entities/IUser";

export namespace ILoadUserByEmailRepository {
    export type Request = string;
    export type Response = IUser[];
}

export interface ILoadUserByEmailRepository {
    loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response>;
}