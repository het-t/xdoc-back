import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { QueryCollectionController } from "@infrastructure/http/controllers/query-collection/QueryCollectionController";
import { makeQueryCollection } from "@main/factories/use-cases/collection/query-collection-factory";

export const makeQueryCollectionController = (): BaseController => {
    const useCase = makeQueryCollection();

    return new QueryCollectionController(useCase);
}