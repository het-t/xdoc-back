import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeEnqueueTaskController } from "@main/factories/controllers/enqueue-tasks/controller-factory";
import { Router } from "express";

export const enqueueRoutes = (router: Router): void => {
    router.post(
        '/enqueueTask',
        expressRouteAdapter(makeEnqueueTaskController())
    )
}