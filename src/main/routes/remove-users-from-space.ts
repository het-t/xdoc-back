import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { makeRemoveUsersFromSpaceController } from "@main/factories/controllers/workspaces/remove-users-by-ids/controller-factory";
import { Router } from "express";

export const removeUsersFromSpaceRoutes = function(router: Router): void {
    router.post(
        "/removeUsersFromSpace",
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeRemoveUsersFromSpaceController())
    );
}