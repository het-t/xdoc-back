import { RequestPointer } from "../interfaces/IPointer";

export namespace IUpdateBlockByIdRepository {
    export type Request = {
        pointer: RequestPointer,
        args: object
    }
    export type Response = void;
}

export interface IUpdateBlockByIdRepository {
    updateBlockById(
        {
            pointer,
            args
        }: IUpdateBlockByIdRepository.Request
    ): Promise<IUpdateBlockByIdRepository.Response>
}