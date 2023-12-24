import { IPointer } from "@infrastructure/http/interfaces/IOperation";

export namespace ICollectionViewUpdateRepository {
    export type Request = {
        pointer: IPointer,
        path: string[],
        args: object
    }
    export type Response = void;
}

export interface ICollectionViewUpdateRepository {
    updateCollectionView(
        {
            pointer,
            args
        }: ICollectionViewUpdateRepository.Request
    ): Promise<ICollectionViewUpdateRepository.Response>
}