import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeQueryCollectionController } from "@main/factories/controllers/collection/query-collection/controller-factory";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { Router } from "express";

export const queryCollectionRoutes = (router: Router): void => {
    router.post(
        '/queryCollection',
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeQueryCollectionController())
    )
}