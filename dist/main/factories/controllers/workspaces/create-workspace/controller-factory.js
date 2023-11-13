"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateWorkspaceController = void 0;
const CreateWorkspaceController_1 = require("@infrastructure/http/controllers/workspaces/CreateWorkspaceController");
const create_workspace_factory_1 = require("@main/factories/use-cases/workspaces/create-workspace-factory");
const makeCreateWorkspaceController = () => {
    const useCase = (0, create_workspace_factory_1.makeCreateWorkspace)();
    return new CreateWorkspaceController_1.CreateWorkspaceController(useCase);
};
exports.makeCreateWorkspaceController = makeCreateWorkspaceController;
