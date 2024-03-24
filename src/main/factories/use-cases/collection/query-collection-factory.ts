import { CollectionQuery } from "@application/use-cases/collection/CollectionQuery";
import { CollectionRepository } from "@infrastructure/db/postgres/repositories/CollectionRepository";

export const makeQueryCollection = (): CollectionQuery => {
    const collectionRepository = new CollectionRepository();

    return new CollectionQuery(collectionRepository);
}