import { UserProps } from "@domain/entities/user";

export namespace CreateUserRepository {
    export type Request = Omit<UserProps, "id" | "createdAt" | "editedAt">
    export type Response = string;
}

export interface CreateUserRepository {
    createUser(
        userData: CreateUserRepository.Request
    ): CreateUserRepository.Response
}