import { WorkspaceRepository } from "./WorkspaceRepository";

export function MockWorkspaceRepository(): jest.Mocked<WorkspaceRepository> {
    return {
        loadWorkspaceById: jest.fn(),
        createWorkspace: jest.fn(),
        getSpaces: jest.fn(),
        removeUsersByIds: jest.fn(),
        removePagePermissions: jest.fn(),
        getUserSpaceRole: jest.fn()
    }
}