import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { UseCase } from "../UseCase";
import { IDbResponse } from "@infrastructure/http/interfaces/IDbResponse";

export namespace ILoadBlockByPointer {
    export type Request = {
        table: string,
        spaceId?: string,
        id: string
    };
    export type Response = IDbResponse | BlockNotFoundError;
}

export interface ILoadBlockByPointer extends UseCase<
    ILoadBlockByPointer.Request,
    ILoadBlockByPointer.Response
> {
    execute(
        { table, spaceId, id }: ILoadBlockByPointer.Request
    ): Promise<ILoadBlockByPointer.Response>
}