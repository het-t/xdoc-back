import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeCreateTeamController } from "@main/factories/controllers/create-team/controller-factory";
import { makeCreateTeam } from "@main/factories/use-cases/teams/create-team-factory";
import { Router } from "express";

export const createTeamRoutes = (router: Router): void => {
    router.post(
        "/createTeam",
        expressRouteAdapter(makeCreateTeamController())
    )
}