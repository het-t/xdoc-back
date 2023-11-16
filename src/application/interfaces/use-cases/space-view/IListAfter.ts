import { IPointer } from "@infrastructure/http/interfaces/IOperation"
import { UseCase } from "../UseCase";

export namespace IListAfter {
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

export interface IListAfter extends UseCase<
    IListAfter.Request,
    IListAfter.Response
>{
    execute(
        { pointer, path, args }: IListAfter.Request
    ): Promise<IListAfter.Response>
}