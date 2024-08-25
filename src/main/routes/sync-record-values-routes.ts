import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeSyncRecordValuesController } from "@main/factories/controllers/record-values/sync-record-values/controller-factory";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { Router } from "express";

export const syncRecordValuesRoutes = (router: Router): void => {
    router.post(
        '/syncRecordValues',
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeSyncRecordValuesController())
    )
}