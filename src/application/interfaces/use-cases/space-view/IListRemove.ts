import { IPointer } from "@infrastructure/http/interfaces/IOperation"
import { UseCase } from "../UseCase"

export namespace IListRemove {
    export type Request = {
        pointer: IPointer,
        path: RequestPath,
        args: RequestArgs
    };
    export type RequestPath = string;
    export type RequestArgs = {
        id: string
    };
    export type Response = void;
}

export interface IListRemove extends UseCase<
    IListRemove.Request,
    IListRemove.Response
> {
    execute(
        { pointer, args, path }: IListRemove.Request
    ): Promise<IListRemove.Response>
}