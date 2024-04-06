import { ICollectionQueryRepository } from "@application/interfaces/repositories/collection/ICollectionQueryRepository";
import { ICollectionQuery } from "@application/interfaces/use-cases/collection/ICollectionQuery";

export class CollectionQuery implements ICollectionQuery {
    constructor(
        private readonly collectionQueryRepository: ICollectionQueryRepository
    ) {}

    async execute(
        { source, loader }: ICollectionQuery.Request
    ): Promise<ICollectionQuery.Response> {
        const dbResponse = await this.collectionQueryRepository.queryCollection({
            collectionId: source.id,
            spaceId: source.spaceId
        });

        if(dbResponse instanceof Error) {
            throw Error(dbResponse.toString());
        }

        return {
            type: "reducers",
            reducerResults: {
                collection_group_results: {
                    type: "results",
                    blockIds: dbResponse.rows.map(({id}: {id: string}) => {
                        return id;
                    }),
                    hasMore: dbResponse.rowCount === loader.reducers.collection_group_results?.limit
                }
            }
        }

    }
}