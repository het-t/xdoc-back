import { UseCase } from "../UseCase";

export namespace ICollectionQuery {
    export type Request = {
        collectionView: {
            id: string,
            spaceId: string
        },
        source: {
            type: string,
            id: string,
            spaceId: string
        },
        loader: {
            reducers: {
                collection_group_results ?: {
                    type: string,
                    limit: number
                }
            },
            sort: Array<string>,
            searchQuery: string,
            userId: string,
            userTimeZone: string
        }
    };
    export type Response = {
        result: {
            type: string,
            reducerResults: {
                collection_group_results: {
                    type: string,
                    blockIds: Array<string>,
                    hasMore: boolean
                }
            },
            sizeHint: number
        },
        recordMap: Record<string, any>,
        collectionIds: Array<string>,
        allBlockIds: Array<string>
    };
}

export interface ICollectionQuery extends UseCase<
    ICollectionQuery.Request,
    ICollectionQuery.Response
> {
    execute(
        { collectionView, source, loader }: ICollectionQuery.Request
    ): Promise<ICollectionQuery.Response>
}