import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeUpdateTeamMembers } from "@main/factories/controllers/udpate-team-members/controller-factory";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { Router } from "express";

export const updateTeamMembersRoutes = (router: Router): void => {
    router.post(
        '/updateTeamMembers',
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeUpdateTeamMembers())
    )
}