import { UserRepository } from "./UsersRepository";

export function MockUsersRepository(): jest.Mocked<UserRepository> {
    return {
        createUser: jest.fn(),
        createEmailUser: jest.fn(),
        loadUserByEmail: jest.fn(),
        getSpaceUsers: jest.fn()
    }
}