import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeUpdateTeamMembers } from "@main/factories/controllers/udpate-team-members/controller-factory";
import { Router } from "express";

export const updateTeamMembersRoutes = (router: Router): void => {
    router.post(
        '/updateTeamMembers',
        expressRouteAdapter(makeUpdateTeamMembers())
    )
}