import { ICollectionQueryRepository } from "@application/interfaces/repositories/collection/ICollectionQueryRepository";
import { ICollectionSearchRepository } from "@application/interfaces/repositories/collection/ICollectionSearchRepository";
import { knexPool } from "../knex/knex";

export class CollectionRepository implements
    ICollectionQueryRepository,
    ICollectionSearchRepository
{
    async queryCollection(
        { collectionId, spaceId }: ICollectionQueryRepository.Request
    ): Promise<ICollectionQueryRepository.Response> {
        return await knexPool.raw(
            'select * from collection_query(?, ?);', 
            [
                collectionId,
                spaceId
            ]
        );
    }

    async searchBlockInCollection({ collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, spaceId }: ICollectionSearchRepository.Request): Promise<ICollectionSearchRepository.Response> {
        return [];
    }
}