import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { LoadBlockByIdController } from "@infrastructure/http/controllers/blocks/LoadBlockByIdController";
import { makeLoadBlockById } from "@main/factories/use-cases/blocks/load-block-by-id-factory";

export const makeLoadPageByIdController = (): BaseController => {
    const useCase = makeLoadBlockById();

    return new LoadBlockByIdController(useCase);
}