import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SaveTransactions } from "@infrastructure/http/controllers/transactions/SaveTransactions";
import { makeCreateBlock } from "@main/factories/use-cases/blocks/create-block-factory";
import { makeUpdateBlockById } from "@main/factories/use-cases/blocks/update-block-by-id-factory";

export const makeSaveTransactionsController = (): BaseController => {

    const createBlockUsecase = makeCreateBlock();
    const updateBlockById = makeUpdateBlockById();

    return new SaveTransactions(
        createBlockUsecase,
        updateBlockById
    );
}