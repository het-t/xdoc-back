export namespace ILoadBlockByPointerRepository {
    export type Request = {
        table: string,
        spaceId?: string,
        id: string
    };
    export type Response = any[];
}

export interface ILoadBlockByPointerRepository {
    loadBlockByPointer(
        { table, spaceId, id }: ILoadBlockByPointerRepository.Request
    ): Promise<ILoadBlockByPointerRepository.Response>
}