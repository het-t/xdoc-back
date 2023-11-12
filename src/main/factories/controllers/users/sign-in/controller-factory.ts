import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SignInController } from "@infrastructure/http/controllers/users/SignInController";
import { makeSignIn } from "@main/factories/use-cases/users/sign-in-factory";

export const makeSignInController = (): BaseController => {
    const useCase = makeSignIn();

    return new SignInController(useCase);
} 