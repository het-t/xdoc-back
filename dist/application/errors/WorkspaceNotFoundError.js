"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceNotFoundError = void 0;
class WorkspaceNotFoundError extends Error {
    constructor() {
        super("Workspace not found");
        this.name = "WorkspaceNotFound";
    }
}
exports.WorkspaceNotFoundError = WorkspaceNotFoundError;
