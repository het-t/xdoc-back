import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace ILoadBlocksByPointersRepository {
    export type Request = {
        table: string,
        ids: string[]
    };
    export type Response = IDbResponse | Error;
}

export interface ILoadBlocksByPointersRepository {
    loadBlocksByPointers(
        {table, ids}: ILoadBlocksByPointersRepository.Request
    ): Promise<ILoadBlocksByPointersRepository.Response>
}