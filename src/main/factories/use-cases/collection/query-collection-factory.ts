import { CollectionQuery } from "@application/use-cases/collection/CollectionQuery";
import { CollectionRepository } from "@infrastructure/db/mongodb/repositories/CollectionRepository";

export const makeQueryCollection = (): CollectionQuery => {
    const collectionRepository = new CollectionRepository();

    return new CollectionQuery(collectionRepository);
}