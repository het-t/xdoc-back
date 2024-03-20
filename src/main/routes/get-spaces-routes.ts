import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeGetSpacesController } from "@main/factories/controllers/workspaces/get-spaces/controller-factory";
import { Router } from "express";

export const getSpacesRoutes = (router: Router): void => {
    router.post(
        '/getSpaces',
        expressRouteAdapter(makeGetSpacesController())
    )
}