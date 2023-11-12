import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { expressRouteSetCookieAdapter } from "@main/adapters/express-route-set-cookie-adapter";
import { Router } from "express";
import { makeSignInController } from "@main/factories/controllers/users/sign-in/controller-factory";

export default (router: Router): void => {
    router.post(
        '/login',
        expressRouteSetCookieAdapter(makeSignInController())
    )
}