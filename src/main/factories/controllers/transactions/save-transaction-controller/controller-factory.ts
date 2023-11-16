import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SaveTransactions } from "@infrastructure/http/controllers/transactions/SaveTransactions";
import { makeCreateBlock } from "@main/factories/use-cases/blocks/create-block-factory";
import { makeUpdateBlockById } from "@main/factories/use-cases/blocks/update-block-by-id-factory";
import { makeListAfter } from "@main/factories/use-cases/space-view/list-after-factory";
import { makeListBefore } from "@main/factories/use-cases/space-view/list-before-factory";

export const makeSaveTransactionsController = (): BaseController => {

    const createBlockUsecase = makeCreateBlock();
    const updateBlockByIdUsecase = makeUpdateBlockById();
    const listAfterUsecase = makeListAfter();
    const listBeforeUsecase = makeListBefore();

    return new SaveTransactions(
        createBlockUsecase,
        updateBlockByIdUsecase,
        listAfterUsecase,
        listBeforeUsecase
    );
}