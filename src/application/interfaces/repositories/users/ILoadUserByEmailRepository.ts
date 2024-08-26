import { User } from "@domain/interfaces/User";

export namespace ILoadUserByEmailRepository {
    export type Request = string;
    export type Response = Array<User & { password: string }>;
}

export interface ILoadUserByEmailRepository {
    loadUserByEmail(
        email: ILoadUserByEmailRepository.Request
    ): Promise<ILoadUserByEmailRepository.Response>;
}