import { ICollectionQueryRepository } from "@application/interfaces/repositories/collection/ICollectionQueryRepository";
import { ICollectionQuery } from "@application/interfaces/use-cases/collection/ICollectionQuery";

export class CollectionQuery implements ICollectionQuery {
    constructor(
        private readonly collectionQueryRepository: ICollectionQueryRepository
    ) {}

    async execute({ collectionView, source, loader }: ICollectionQuery.Request): Promise<ICollectionQuery.Response> {
        return await this.collectionQueryRepository.queryCollection({
            collectionView,
            source,
            loader
        })
    }
}