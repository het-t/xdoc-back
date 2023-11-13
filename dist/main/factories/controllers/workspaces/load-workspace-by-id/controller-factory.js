"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadWorkspaceByIdController = void 0;
const LoadWorkspaceByIdController_1 = require("@infrastructure/http/controllers/workspaces/LoadWorkspaceByIdController");
const load_workspace_by_id_factory_1 = require("@main/factories/use-cases/workspaces/load-workspace-by-id-factory");
const makeLoadWorkspaceByIdController = () => {
    const useCase = (0, load_workspace_by_id_factory_1.makeLoadWorkspaceById)();
    return new LoadWorkspaceByIdController_1.LoadWorkspaceByIdController(useCase);
};
exports.makeLoadWorkspaceByIdController = makeLoadWorkspaceByIdController;
