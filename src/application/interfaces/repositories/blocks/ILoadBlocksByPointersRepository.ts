import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace ILoadBlocksByPointersRepository {
    export type Request = {
        table: string,
        spaceId: string,
        ids: string[]
    };
    export type Response = IDbResponse | Error;
}

export interface ILoadBlocksByPointersRepository {
    loadBlocksByPointers(
        {table, spaceId, ids}: ILoadBlocksByPointersRepository.Request
    ): Promise<ILoadBlocksByPointersRepository.Response>
}