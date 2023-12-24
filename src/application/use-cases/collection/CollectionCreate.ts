import { ICollectionCreateRepository } from "@application/interfaces/repositories/collection/ICollectionCreateRepository";
import { ICollectionCreate } from "@application/interfaces/use-cases/collection/ICollectionCreate";

export class CollectionCreate implements ICollectionCreate {
    constructor(
        private readonly collectionCreateRepository: ICollectionCreateRepository
    ) {}

    async execute(
        { pointer, args }: ICollectionCreate.Request
    ): Promise<ICollectionCreate.Response> {
        await this.collectionCreateRepository.createCollection({
            pointer,
            args
        })
    }
}