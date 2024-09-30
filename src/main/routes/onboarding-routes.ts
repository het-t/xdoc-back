import { Router } from "express";
import { expressRouteSetCookieAdapter } from "@main/adapters/express-route-set-cookie-adapter";
import { makeSignInController } from "@main/factories/controllers/users/sign-in/controller-factory";

export const onBoadingRoutes = (router: Router): void => {
    router.post(
        '/signIn',
        expressRouteSetCookieAdapter(makeSignInController())
    );
}