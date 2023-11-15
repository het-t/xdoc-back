import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { UseCase } from "../UseCase";
import { Block } from "@domain/entities/block";

export namespace ILoadBlockById {
    export type Request = string;
    export type Response = Block | BlockNotFoundError;
}

export interface ILoadBlockById extends UseCase<
    ILoadBlockById.Request,
    ILoadBlockById.Response
> {
    execute(
        id: ILoadBlockById.Request
    ): Promise<ILoadBlockById.Response>
}