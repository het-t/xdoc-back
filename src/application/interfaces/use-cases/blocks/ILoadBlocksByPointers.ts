import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { UseCase } from "../UseCase";
import { IPointer } from "@domain/interfaces/ITransaction";
import { UUID } from "crypto";

export namespace ILoadBlocksByPointers {
    export type Request = {
        pointers: IPointer[],
        userId: UUID
    };
    export type Response = any[];
}

export interface ILoadBlocksByPointers extends UseCase<
    ILoadBlocksByPointers.Request,
    ILoadBlocksByPointers.Response
> {
    execute(
        pointers: ILoadBlocksByPointers.Request
    ): Promise<ILoadBlocksByPointers.Response>;
}