import { RequestPointer } from "../interfaces/IPointer"

export namespace IListAfterRepository {
    export type Request = {
        pointer: RequestPointer,
        path: string,
        args: {
            after?: string,
            id: string
        }
    }
    export type Response = void;
}

export interface IListAfterRepository {
    listAfter(
        {
            pointer,
            path,
            args
        }: IListAfterRepository.Request
    ): Promise<IListAfterRepository.Response>
}