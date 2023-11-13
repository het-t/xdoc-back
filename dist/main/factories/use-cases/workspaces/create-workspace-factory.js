"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateWorkspace = void 0;
const CreateWorkspace_1 = require("@application/use-cases/workspaces/CreateWorkspace");
const WorkspaceRepository_1 = require("@infrastructure/db/mongodb/repositories/WorkspaceRepository");
const makeCreateWorkspace = () => {
    const workspaceRepository = new WorkspaceRepository_1.WorkspaceRepository();
    return new CreateWorkspace_1.CreateWorkspace(workspaceRepository);
};
exports.makeCreateWorkspace = makeCreateWorkspace;
