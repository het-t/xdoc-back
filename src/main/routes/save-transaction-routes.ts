import { Router } from "express";
import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeSaveTransactionsController } from "@main/factories/controllers/transactions/save-transaction-controller/controller-factory";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";

export const saveTransactionsRoutes = (router: Router): void => {
    router.post(
        '/saveTransactions',
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeSaveTransactionsController())
    )
}