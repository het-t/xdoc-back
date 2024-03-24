import { CollectionViewUpdate } from "@application/use-cases/collection-view/CollectionViewUpdate";
import { CollectionViewRepository } from "@infrastructure/db/postgres/repositories/CollectionViewRepository";

export const makeUpdateCollectionView = (): CollectionViewUpdate => {
    const collectionViewUpdateRepository = new CollectionViewRepository();

    return new CollectionViewUpdate(collectionViewUpdateRepository);
}