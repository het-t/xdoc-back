import { Page } from "@domain/entities/page";

export namespace ILoadBlockByIdRepository {
    export type Request = string;
    export type Response = Page;
}

export interface ILoadBlockByIdRepository {
    loadBlockById(
        id: ILoadBlockByIdRepository.Request
    ): Promise<ILoadBlockByIdRepository.Response>
}