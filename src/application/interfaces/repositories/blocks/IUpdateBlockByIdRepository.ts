import { RequestPointer } from "../interfaces/IPointer";

export namespace IUpdateBlockByIdRepository {
    export type Request = {
        pointer: RequestPointer,
        path: string,
        args: object
    }
    export type Response = void;
}

export interface IUpdateBlockByIdRepository {
    updateBlockById(
        {
            pointer,
            path,
            args
        }: IUpdateBlockByIdRepository.Request
    ): Promise<IUpdateBlockByIdRepository.Response>
}