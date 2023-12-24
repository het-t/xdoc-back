import { CollectionCreate } from "@application/use-cases/collection/CollectionCreate";
import { CollectionRepository } from "@infrastructure/db/mongodb/repositories/CollectionRepository";

export const makeCreateCollection = (): CollectionCreate => {
    const collectionRepository = new CollectionRepository();
    
    return new CollectionCreate(collectionRepository);
}