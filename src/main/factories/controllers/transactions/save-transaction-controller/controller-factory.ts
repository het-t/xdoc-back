import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SaveTransactionsController } from "@infrastructure/http/controllers/transactions/SaveTransactions";
import { makeHandleOperation } from "@main/factories/use-cases/save-transactions/operation-factory";

export const makeSaveTransactionsController = (): BaseController => {
    const handleOperation = makeHandleOperation();

    return new SaveTransactionsController(
        handleOperation
    );
}