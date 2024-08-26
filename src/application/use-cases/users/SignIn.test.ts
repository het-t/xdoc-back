import { makeMockSignIn } from "@main/factories/use-cases/users/sign-in-factory.mock";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";
import { ISignInInterface } from "@application/interfaces/use-cases/users/ISignInInterface";
import { JWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor";
import { HashCompare } from "@application/interfaces/cyptography/HashCompare";
import { User } from "@domain/interfaces/User";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";

describe("usecase signin", () => {
    let signInUsecase: ISignInInterface;
    let mockLoadUserByEmailRepository: jest.Mocked<UserRepository>;
    let mockHashCompare: jest.Mocked<HashCompare>;
    let mockJWTAdaptor: jest.Mocked<JWTAdaptor>;

    beforeEach(() => {
        signInUsecase = makeMockSignIn();
        mockLoadUserByEmailRepository = (signInUsecase as any).loadUserByEmailRepository;
        mockHashCompare = (signInUsecase as any).hashCompare;
        mockJWTAdaptor = (signInUsecase as any).jwtGenerator;
    });

    it("sign in attempt with valid credentials", async() => {
        const mockInput = {
            email: "angel@xdoc.com",
            password: "angel@xdoc"
        };

        const resolvedUser: User & { password: string } = {
            id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            email: "angel@xdoc.com",
            name: "angel",
            alive: true,
            password: "angel@xdoc"
        };

        mockLoadUserByEmailRepository.loadUserByEmail.mockResolvedValue([resolvedUser]);

        mockHashCompare.compare.mockResolvedValue(true);

        const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        mockJWTAdaptor.generateAccessToken.mockResolvedValue(dummyToken);

        const result = await signInUsecase.execute(mockInput);

        expect(result).toEqual({
            authenticationToken: dummyToken,
            refreshToken: undefined,
            user: {
                id: resolvedUser.id,
                email: resolvedUser.email,
                name: resolvedUser.name,
                alive: resolvedUser.alive
            }
        });
    });

    it("sign in attempt with invalid password", async() => {
        const mockInput = {
            email: "angel@xdoc.com",
            password: "angel@xdoc2"
        };

        const resolvedUser: User & { password: string } = {
            id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            email: "angel@xdoc.com",
            name: "angel",
            alive: true,
            password: "angel@xdoc"
        };

        mockLoadUserByEmailRepository.loadUserByEmail.mockResolvedValue([resolvedUser]);

        mockHashCompare.compare.mockResolvedValue(false);

        const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        mockJWTAdaptor.generateAccessToken.mockResolvedValue(dummyToken);

        const result = await signInUsecase.execute(mockInput);

        expect(result).toEqual(new InvalidPasswordError());
    });

    it("sign in attempt with invalid username", async() => {
        const mockInput = {
            email: "angel@xdoc.com",
            password: "angel@xdoc"
        };

        mockLoadUserByEmailRepository.loadUserByEmail.mockResolvedValue([]);

        const result = await signInUsecase.execute(mockInput);

        expect(result).toEqual(new InvalidUserError());
    });
});