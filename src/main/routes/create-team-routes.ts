import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeCreateTeamController } from "@main/factories/controllers/create-team/controller-factory";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { Router } from "express";

export const createTeamRoutes = (router: Router): void => {
    router.post(
        "/createTeam",
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeCreateTeamController())
    )
}