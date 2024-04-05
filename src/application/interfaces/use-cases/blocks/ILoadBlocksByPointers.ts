import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { UseCase } from "../UseCase";
import { IPointer } from "@domain/entities/ITransaction";

export namespace ILoadBlocksByPointers {
    export type Request = {
        pointers: IPointer[],
        spaceId: string
    };
    export type Response = Record<string, Array<object | BlockNotFoundError>>;
}

export interface ILoadBlocksByPointers extends UseCase<
    ILoadBlocksByPointers.Request,
    ILoadBlocksByPointers.Response
> {
    execute(
        pointers: ILoadBlocksByPointers.Request
    ): Promise<ILoadBlocksByPointers.Response>
}