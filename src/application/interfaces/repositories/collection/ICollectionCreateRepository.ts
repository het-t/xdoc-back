import { IPointer } from "@infrastructure/http/interfaces/IOperation"

export namespace ICollectionCreateRepository {
    export type Request = {
        pointer: IPointer,
        args: object
    };
    export type Response = void;
}

export interface ICollectionCreateRepository {
    createCollection(
        {
            pointer,
            args
        }: ICollectionCreateRepository.Request
    ): Promise<ICollectionCreateRepository.Response>
}