import { expressRouteAdapter } from "@main/adapters/express-route-adapter";
import { makeGetVisibleUsersController } from "@main/factories/controllers/get-visible-users/controller-factory";
import { Router } from "express";

export const getVisibleUsersRoutes = (router: Router): void => {
    router.post(
        "/getVisibleUsers",
        expressRouteAdapter(makeGetVisibleUsersController())
    );
}