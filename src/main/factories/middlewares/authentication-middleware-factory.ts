import { BaseMiddleware } from "@infrastructure/http/middlewares/BaseMiddleware";
import { makeAuthenticate } from "../use-cases/users/authenticate-factory";
import { AuthMiddleware } from "@infrastructure/http/middlewares/authentication/AuthMiddleware";

export const makeAuthenticationMiddleware = (): BaseMiddleware => {
    const authenticationUseCase = makeAuthenticate();
    return new AuthMiddleware(authenticationUseCase);
}