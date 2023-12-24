import { IPointer } from "@infrastructure/http/interfaces/IOperation";
import { UseCase } from "../UseCase";

export namespace ICollectionUpdate {
    export type Request = {
        pointer: IPointer,
        path: string[],
        args:object 
    }
    export type Response = void;
}

export interface ICollectionUpdate extends UseCase<
    ICollectionUpdate.Request,
    ICollectionUpdate.Response
> {
    execute(
        { pointer, args }: ICollectionUpdate.Request
    ): Promise<ICollectionUpdate.Response>
}