import { ICollectionQueryRepository } from "@application/interfaces/repositories/collection/ICollectionQueryRepository";
import { ICollectionSearchRepository } from "@application/interfaces/repositories/collection/ICollectionSearchRepository";

export class CollectionRepository implements
    ICollectionQueryRepository,
    ICollectionSearchRepository
{
    async queryCollection({ collectionView, source, loader }: ICollectionQueryRepository.Request): Promise<ICollectionQueryRepository.Response> {
        return null;
    }

    async searchBlockInCollection({ collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, spaceId }: ICollectionSearchRepository.Request): Promise<ICollectionSearchRepository.Response> {
        return [];
    }
}