import { Router } from "express";
import { expressRouteAdapter } from "@main/adapters/express-route-adapter"
import { makeLoadWorkspaceByIdController } from "@main/factories/controllers/workspaces/load-workspace-by-id/controller-factory"
import { makeCreateWorkspaceController } from "@main/factories/controllers/workspaces/create-workspace/controller-factory";

export default (router: Router): void => {
    router.get(
        '/workspace/:id',
        expressRouteAdapter(makeLoadWorkspaceByIdController())
    )

    router.post(
        '/workspace',
        expressRouteAdapter(makeCreateWorkspaceController())
    )
}