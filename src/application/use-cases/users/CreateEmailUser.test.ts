import { ICreateEmailUser } from "@application/interfaces/use-cases/users/ICreateEmailUserInterface";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";
import { makeCreateEmailUser } from "@main/factories/use-cases/users/create-email-user-factory";
import { makeMockCreateEmailUser } from "@main/factories/use-cases/users/create-email-user-factory.mock";
import { randomUUID } from "crypto";

describe("usecase createemailuser", () => {
    let createEmailUserUsecase: ICreateEmailUser;
    let mockCreateEmailUserRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        createEmailUserUsecase = makeMockCreateEmailUser();
        mockCreateEmailUserRepository = (createEmailUserUsecase as any).createEmailUserRepository;
    });

    it("creating user with unregistered email", async () => {
        const mockInput = {
            id: randomUUID(),
            email: "someone@gmail.com"
        };

        mockCreateEmailUserRepository.createEmailUser.mockResolvedValue({
            id: mockInput.id
        });

        const result = await createEmailUserUsecase.execute(mockInput);

        expect(result).toEqual(mockInput.id);
    });

    it("creating user with registered email", async () => {
        const mockInput = {
            email: ""
        };
    })
})