import { BlockRepository } from "./BlockRepository"

export function MockBlockRepository(): jest.Mocked<BlockRepository> {
    return {
        loadBlocksByPointers: jest.fn(),    
        getBlockPermissionsByIds: jest.fn()
    }
}