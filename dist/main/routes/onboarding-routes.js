"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_set_cookie_adapter_1 = require("@main/adapters/express-route-set-cookie-adapter");
const controller_factory_1 = require("@main/factories/controllers/users/sign-in/controller-factory");
exports.default = (router) => {
    router.post('/signin', (0, express_route_set_cookie_adapter_1.expressRouteSetCookieAdapter)((0, controller_factory_1.makeSignInController)()));
};
