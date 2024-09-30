import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteMiddlewareAdapter } from "@main/adapters/express-route-middleware-adapter";
import { makeCreateEmailUserController } from "@main/factories/controllers/create-email-user/controller-factory";
import { makeAuthenticateController } from "@main/factories/controllers/users/authenticate/controller-factory";
import { Router } from "express";

export const createEmailUserRoutes = (router: Router): void => {
    router.post(
        "/createEmailUser",
        expressRouteMiddlewareAdapter(makeAuthenticateController()),
        expressRouteAdapter(makeCreateEmailUserController())
    )
}