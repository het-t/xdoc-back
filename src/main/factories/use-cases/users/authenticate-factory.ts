import { Authenticate } from "@application/use-cases/users/Authentication";
import { IAuthenticateInterface } from "@application/interfaces/use-cases/users/IAuthenticateInterface"
import { JWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor";
import env from "@config/env";

export const makeAuthenticate = (): IAuthenticateInterface => {
    const jwtVerifier = new JWTAdaptor(env.authenticationTokenSecret, env.refreshTokenSecret);
    const authentication = new Authenticate(jwtVerifier);

    return authentication;
}