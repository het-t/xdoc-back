import { ICollectionSearchRepository } from "@application/interfaces/repositories/collection/ICollectionSearchRepository";
import { ICollectionSearch } from "@application/interfaces/use-cases/collection/ICollectionSearch";

export class CollectionSearch implements ICollectionSearch {
    constructor(
        private readonly collectionSearchRepository: ICollectionSearchRepository
    ) {}

    async execute({ 
        collectionId, 
        filters, 
        ignoresHighlight, 
        limit, 
        query, 
        recentPagesForBoosting, 
        sort, 
        source, 
        spaceId, 
        type 
    }: ICollectionSearch.Request): Promise<ICollectionSearch.Response> {
        if (type === "BlocksInCollection") {
            const results =  await this.collectionSearchRepository.searchBlockInCollection({
                collectionId,
                filters,
                ignoresHighlight,
                limit,
                query,
                recentPagesForBoosting,
                sort,
                spaceId
            });

            return {
                results,
                total: results.length,
                recordMap: {}
            };
        }

        return {
            results: [],
            total: 0,
            recordMap: {}
        };
    }
}