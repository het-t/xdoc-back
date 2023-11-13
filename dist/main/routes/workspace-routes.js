"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("@main/adapters/express-route-adapter");
const controller_factory_1 = require("@main/factories/controllers/workspaces/load-workspace-by-id/controller-factory");
const controller_factory_2 = require("@main/factories/controllers/workspaces/create-workspace/controller-factory");
exports.default = (router) => {
    router.get('/workspace/:id', (0, express_route_adapter_1.expressRouteAdapter)((0, controller_factory_1.makeLoadWorkspaceByIdController)()));
    router.post('/workspace', (0, express_route_adapter_1.expressRouteAdapter)((0, controller_factory_2.makeCreateWorkspaceController)()));
};
