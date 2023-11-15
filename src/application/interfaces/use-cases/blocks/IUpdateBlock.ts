import { IPointer } from "@infrastructure/http/interfaces/IOperation";
import { UseCase } from "../UseCase"

export namespace IUpdateBlock {
    export type Request = {
        pointer: IPointer,
        path: RequestPath,
        args: RequestArgs
    }
    export type RequestPath = string;
    export type RequestArgs = object;
    export type Response = void;
}

export interface IUpdateBlock extends UseCase<
    IUpdateBlock.Request,
    IUpdateBlock.Response
> {
    execute(
        {
            pointer,
            path,
            args
        }: IUpdateBlock.Request
    ): Promise<IUpdateBlock.Response>
}