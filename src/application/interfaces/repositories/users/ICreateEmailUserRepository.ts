import { UUID } from "crypto";

export namespace ICreateEmailUserRepository {
    export type Request = {
        id: UUID,
        email: string
    };
    export type Response = {
        id: UUID
    };
}

export interface ICreateEmailUserRepository {
    createEmailUser(
        { id, email }: ICreateEmailUserRepository.Request
    ): Promise<ICreateEmailUserRepository.Response>;
}