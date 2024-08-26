import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { Collection } from "@domain/interfaces/Collection";

export namespace ICollectionLoadByIdRepository {
    export type Request = string;
    export type Response = Collection | BlockNotFoundError;
}

export interface ICollectionLoadByIdRepository {
    loadCollectionById(
        id: ICollectionLoadByIdRepository.Request
    ): Promise<ICollectionLoadByIdRepository.Response>
}