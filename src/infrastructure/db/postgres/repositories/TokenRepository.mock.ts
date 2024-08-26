import { TokenRepository } from "./TokenRepository";

export function MockTokenRepository(): jest.Mocked<TokenRepository> {
    return {
        createToken: jest.fn(),
        deleteToken: jest.fn(),
        getToken: jest.fn()
    };
}