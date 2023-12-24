import { ICollectionUpdateRepository } from "@application/interfaces/repositories/collection/ICollectionUpdateRepsitory";
import { ICollectionUpdate } from "@application/interfaces/use-cases/collection/ICollectionUpdate";

export class CollectionUpdate implements ICollectionUpdate {
    constructor(
        private readonly collectionUpdateRepository: ICollectionUpdateRepository
    ) {}

    async execute(
        { pointer, path, args }: ICollectionUpdate.Request
    ): Promise<ICollectionUpdate.Response> {
        await this.collectionUpdateRepository.updateCollection({
            pointer,
            path,
            args
        })
    }
}