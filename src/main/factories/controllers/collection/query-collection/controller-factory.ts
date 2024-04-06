import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { QueryCollectionController } from "@infrastructure/http/controllers/query-collection/QueryCollectionController";
import { makeLoadBlocksByPointers } from "@main/factories/use-cases/blocks/load-blocks-by-pointers";
import { makeQueryCollection } from "@main/factories/use-cases/collection/query-collection-factory";

export const makeQueryCollectionController = (): BaseController => {
    const queryCollectionUsecase = makeQueryCollection();
    const loadBlocksByPointersUsecase = makeLoadBlocksByPointers();

    return new QueryCollectionController(
        queryCollectionUsecase,
        loadBlocksByPointersUsecase
    );
}