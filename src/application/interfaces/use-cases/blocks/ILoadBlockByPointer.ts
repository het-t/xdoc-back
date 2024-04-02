import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { UseCase } from "../UseCase";

export namespace ILoadBlockByPointer {
    export type Request = {
        table: string,
        spaceId?: string,
        id: string
    };
    export type Response = any[] | BlockNotFoundError;
}

export interface ILoadBlockByPointer extends UseCase<
    ILoadBlockByPointer.Request,
    ILoadBlockByPointer.Response
> {
    execute(
        { table, spaceId, id }: ILoadBlockByPointer.Request
    ): Promise<ILoadBlockByPointer.Response>
}