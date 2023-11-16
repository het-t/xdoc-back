import { RequestPointer } from "../interfaces/IPointer"

export namespace IListRemoveRepository {
    export type Request = {
        pointer: RequestPointer,
        path: string,
        args: {
            id: string
        }
    };
    export type Response = void;
}

export interface IListRemoveRepository {
    listRemove(
        {
            pointer,
            path,
            args
        }: IListRemoveRepository.Request
    ): Promise<IListRemoveRepository.Response>
}