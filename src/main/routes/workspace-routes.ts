import { Router } from "express";
import { expressRouteAdapter } from "@main/adapters/express-route-adapter"
import { makeLoadWorkspaceByIdController } from "@main/factories/controllers/workspaces/load-workspace-by-id/controller-factory"
import { makeCreateWorkspaceController } from "@main/factories/controllers/workspaces/create-workspace/controller-factory";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";

export const workspaceRoutes = (router: Router): void => {
    router.get(
        '/workspace/:id',
        expressRouteAdapter(makeLoadWorkspaceByIdController())
    )

    router.post(
        '/createSpace',
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeCreateWorkspaceController())
    )
}