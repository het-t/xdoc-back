import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace ILoadBlockByPointerRepository {
    export type Request = {
        table: string,
        spaceId?: string,
        id: string
    };
    export type Response = IDbResponse;
}

export interface ILoadBlockByPointerRepository {
    loadBlockByPointer(
        { table, spaceId, id }: ILoadBlockByPointerRepository.Request
    ): Promise<ILoadBlockByPointerRepository.Response>
}