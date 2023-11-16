import { RequestPointer } from "../interfaces/IPointer"

export namespace IListBeforeRepository {
    export type Request = {
        pointer: RequestPointer,
        path: string,
        args: {
            before?: string,
            id: string
        }
    }
    export type Response = void;
}

export interface IListBeforeRepository {
    listBefore(
        {
            pointer,
            path,
            args
        }: IListBeforeRepository.Request
    ): Promise<IListBeforeRepository.Response>
}