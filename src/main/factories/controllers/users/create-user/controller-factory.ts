import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { CreateUserController } from "@infrastructure/http/controllers/users/CreateUserController";
import { makeCreateUser } from "@main/factories/use-cases/users/create-user-factory";

export const makeCreateUserController = (): BaseController => {
    const useCase = makeCreateUser();

    return new CreateUserController(useCase);
}