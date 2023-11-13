"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadWorkspaceById = void 0;
const LoadWorkspaceById_1 = require("@application/use-cases/workspaces/LoadWorkspaceById");
const WorkspaceRepository_1 = require("@infrastructure/db/mongodb/repositories/WorkspaceRepository");
const makeLoadWorkspaceById = () => {
    const workspaceRepository = new WorkspaceRepository_1.WorkspaceRepository();
    return new LoadWorkspaceById_1.LoadWorkspaceById(workspaceRepository);
};
exports.makeLoadWorkspaceById = makeLoadWorkspaceById;
