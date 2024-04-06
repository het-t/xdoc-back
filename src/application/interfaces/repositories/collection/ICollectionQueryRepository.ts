import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace ICollectionQueryRepository {
    export type Request = {
        collectionId: string,
        spaceId: string
    };
    export type Response = IDbResponse;
}

export interface ICollectionQueryRepository {
    queryCollection(
        {
            collectionId, spaceId
        }: ICollectionQueryRepository.Request
    ): Promise<ICollectionQueryRepository.Response>
}