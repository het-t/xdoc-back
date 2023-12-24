import { ICollectionViewUpdateRepository } from "@application/interfaces/repositories/collection-view/ICollectionViewUpdateRepository";
import { ICollectionViewUpdate } from "@application/interfaces/use-cases/collection-view/ICollectionViewUpdate";

export class CollectionViewUpdate implements ICollectionViewUpdate {
    constructor(
        private readonly collectionViewUpdateRepository: ICollectionViewUpdateRepository
    ) {}

    async execute(
        { pointer, path, args }: ICollectionViewUpdate.Request
    ): Promise<ICollectionViewUpdate.Response> {
        await this.collectionViewUpdateRepository.updateCollectionView({
            pointer,
            path,
            args
        })
    }
}