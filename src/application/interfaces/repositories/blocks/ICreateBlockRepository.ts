export namespace ICreateBlockRepository {
    export type Request = {
        type: string,
        id: string,
        space_id: string
    }
    export type Response = void;
}

export interface ICreateBlockRepository {
    createBlock(
        blockData: ICreateBlockRepository.Request
    ): Promise<ICreateBlockRepository.Response>
}