import { User } from "@domain/entities/user";

export namespace LoadUserByEmailRepository {
    export type Request = string;
    export type Response = User | null;
}

export interface LoadUserByEmailRepository {
    loadUserByEmail(
        email: LoadUserByEmailRepository.Request
    ): Promise<LoadUserByEmailRepository.Response>;
}