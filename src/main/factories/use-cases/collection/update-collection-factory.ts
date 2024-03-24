import { CollectionUpdate } from "@application/use-cases/collection/CollectionUpdate";
import { CollectionRepository } from "@infrastructure/db/postgres/repositories/CollectionRepository";

export const makeUpdateCollection = (): CollectionUpdate => {
    const collectionRepository = new CollectionRepository();

    return new CollectionUpdate(collectionRepository);
}