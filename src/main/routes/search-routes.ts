import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeSearchController } from "@main/factories/controllers/search/controller-factory";
import { Router } from "express";

export const searchRoutes = (router: Router): void => {
    router.post(
        '/search',
        expressRouteAdapter(makeSearchController())
    )
}