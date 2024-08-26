import { IDbResponse } from "@application/interfaces/db/IDbResponse";
import { Block } from "@domain/interfaces/Block";
import { Space } from "@domain/interfaces/Space";
import { Team } from "@domain/interfaces/Team";
import { User } from "@domain/interfaces/User";

export namespace ILoadBlocksByPointersRepository {
    export type Request = {
        table: string,
        ids: string[]
    };
    export type Response = IDbResponse<Array<Block | Space | Team | User>> | Error;
}

export interface ILoadBlocksByPointersRepository {
    loadBlocksByPointers(
        {table, ids}: ILoadBlocksByPointersRepository.Request
    ): Promise<ILoadBlocksByPointersRepository.Response>
}