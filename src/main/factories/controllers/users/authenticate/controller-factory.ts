import { AuthController } from "@infrastructure/http/controllers/authentication/AuthController";
import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { makeAuthenticate } from "@main/factories/use-cases/users/authenticate-factory";

export const makeAuthenticateController = (): BaseController => {
    const useCase = makeAuthenticate();
    return new AuthController(useCase);
}