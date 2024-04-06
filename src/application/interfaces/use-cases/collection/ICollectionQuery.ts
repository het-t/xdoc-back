import { UseCase } from "../UseCase";

export namespace ICollectionQuery {
    export type Request = {
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
            userId: string
        }
    };
    export type Response = {
        type: string,
        reducerResults?: {
            collection_group_results?: {
                type: "results",
                blockIds: string[],
                hasMore: boolean
            }
        }
    };
}

export interface ICollectionQuery extends UseCase<
    ICollectionQuery.Request,
    ICollectionQuery.Response
> {
    execute(
        { source, loader }: ICollectionQuery.Request
    ): Promise<ICollectionQuery.Response>
}