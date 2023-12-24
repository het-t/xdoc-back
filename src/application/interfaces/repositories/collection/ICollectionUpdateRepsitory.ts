import { IPointer } from "@infrastructure/http/interfaces/IOperation";

export namespace ICollectionUpdateRepository {
    export type Request = {
        pointer: IPointer,
        path: string[],
        args: object
    }
    export type Response = void;
}

export interface ICollectionUpdateRepository {
    updateCollection(
        {
            pointer,
            path,
            args
        }: ICollectionUpdateRepository.Request
    ): Promise<ICollectionUpdateRepository.Response>
}