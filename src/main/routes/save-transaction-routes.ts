import { Router } from "express";
import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeSaveTransactionsController } from "@main/factories/controllers/transactions/save-transaction-controller/controller-factory";

export const saveTransactionsRoutes = (router: Router): void => {
    router.post(
        '/saveTransactions',
        expressRouteAdapter(makeSaveTransactionsController())
    )
}