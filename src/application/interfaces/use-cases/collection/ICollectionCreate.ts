import { IPointer } from "@infrastructure/http/interfaces/IOperation";
import { UseCase } from "../UseCase";

export namespace ICollectionCreate {
    export type Request = {
        pointer: IPointer,
        args: object
    }
    export type Response = void
}

export interface ICollectionCreate extends UseCase<
    ICollectionCreate.Request,
    ICollectionCreate.Response
> {
    execute(
        { pointer, args }: ICollectionCreate.Request
    ): Promise<ICollectionCreate.Response>
}