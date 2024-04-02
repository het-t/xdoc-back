import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeGetTeamsController } from "@main/factories/controllers/get-teams/controller-factory";
import { Router } from "express";

export const getTeamsRoutes = (router: Router): void => {
    router.post(
        '/getTeams',
        expressRouteAdapter(makeGetTeamsController())
    )
}