import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeQueryCollectionController } from "@main/factories/controllers/collection/query-collection/controller-factory";
import { Router } from "express";

export const queryCollectionRoutes = (router: Router): void => {
    router.post(
        '/queryCollection',
        expressRouteAdapter(makeQueryCollectionController())
    )
}