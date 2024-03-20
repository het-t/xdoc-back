import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeSyncRecordValuesController } from "@main/factories/controllers/record-values/sync-record-values/controller-factory";
import { Router } from "express";

export const syncRecordValuesRoutes = (router: Router): void => {
    router.post(
        '/syncRecordValues',
        expressRouteAdapter(makeSyncRecordValuesController())
    )
}