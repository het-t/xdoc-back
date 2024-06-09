import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeRemoveUsersFromSpaceController } from "@main/factories/controllers/workspaces/remove-users-by-ids/controller-factory";
import { Router } from "express";

export const removeUsersFromSpaceRoutes = function(router: Router): void {
    router.post(
        "/removeUsersFromSpace",
        expressRouteAdapter(makeRemoveUsersFromSpaceController())
    );
}