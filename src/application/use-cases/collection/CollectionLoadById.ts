import { ICollectionLoadByIdRepository } from "@application/interfaces/repositories/collection/ICollectionLoadByIdRepository"; 
import { ICollectionLoadById } from "@application/interfaces/use-cases/collection/ICollectionLoadById";

export class CollectionLoadById implements ICollectionLoadById {
    constructor(
        private readonly collectionLoadByIdRepository: ICollectionLoadByIdRepository
    ) { }

    async execute(
        id: ICollectionLoadById.Request
    ): Promise<ICollectionLoadById.Response> {
        return await this.collectionLoadByIdRepository.loadCollectionById(id);
    }
}