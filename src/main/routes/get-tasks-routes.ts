import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeGetTasksController } from "@main/factories/controllers/get-tasks/controller-factory";
import { Router } from "express";

export const getTasksRoutes = (router: Router): void => {
    router.post(
        '/getTasks',
        expressRouteAdapter(makeGetTasksController())
    )
}