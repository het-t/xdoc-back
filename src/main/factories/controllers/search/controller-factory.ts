import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SearchController } from "@infrastructure/http/controllers/search/SearchController";
import { makeSearchCollection } from "@main/factories/use-cases/collection/search-collection-factory";

export const makeSearchController = (): BaseController => {
    const usecaseCollection = makeSearchCollection();

    return new SearchController(
        usecaseCollection
    );
}