import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeCreateEmailUser } from "@main/factories/controllers/create-email-user/controller-factory";
import { Router } from "express";

export const createEmailuserRoutes = (router: Router): void => {
    router.post(
        "/createEmailUser",
        expressRouteAdapter(makeCreateEmailUser())
    )
}