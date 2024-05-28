import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeFindUserController } from "@main/factories/controllers/find-user/controller-factory";
import { Router } from "express";

export const findUserRoutes = (router: Router): void => {
    router.post(
        "/findUser",
        expressRouteAdapter(makeFindUserController())
    )
}