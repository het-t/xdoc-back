import { IOperation } from "@domain/interfaces/ITransaction";
import { UseCase } from "../UseCase";

export namespace IHandleOperation {
    export type Request = IOperation;
    export type Response = object;
}

export interface IHandleOperation extends UseCase<
    IHandleOperation.Request,
    IHandleOperation.Response
> {
    execute(
        { pointer, args, command, path, additionalPointers }: IHandleOperation.Request
    ): Promise<IHandleOperation.Response>;
}