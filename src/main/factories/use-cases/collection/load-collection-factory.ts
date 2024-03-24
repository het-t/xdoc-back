import { CollectionLoadById } from "@application/use-cases/collection/CollectionLoadById";
import { CollectionRepository } from "@infrastructure/db/postgres/repositories/CollectionRepository";

export const makeLoadCollectionById = (): CollectionLoadById => {
    const collectionRepository = new CollectionRepository();

    return new CollectionLoadById(collectionRepository);
}