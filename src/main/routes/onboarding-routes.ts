import { Router } from "express";
import { expressRouteSetCookieAdapter } from "@main/adapters/express-route-set-cookie-adapter";
import { makeSignInController } from "@main/factories/controllers/users/sign-in/controller-factory";
import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeCreateUserController } from "@main/factories/controllers/users/create-user/controller-factory";

export const onBoadingRoutes = (router: Router): void => {
    router.post(
        '/signIn',
        expressRouteSetCookieAdapter(makeSignInController())
    );

    router.post(
        '/signUp',
        expressRouteAdapter(makeCreateUserController())
    )
}