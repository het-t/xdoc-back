import { IPointer } from "@infrastructure/http/interfaces/IOperation"
import { UseCase } from "../UseCase";

export namespace IListBefore {
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

export interface IListBefore extends UseCase<
    IListBefore.Request,
    IListBefore.Response
>{
    execute(
        { pointer, path, args }: IListBefore.Request
    ): Promise<IListBefore.Response>
}