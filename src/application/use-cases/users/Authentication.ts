import { AuthenticateInterface } from "@application/interfaces/use-cases/users/AuthenticateInterface";
import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";
import { ForbiddenError } from "@application/errors/ForbiddenError";

export class Authenticate implements AuthenticateInterface {
    constructor(private readonly jwtVerifier: JWTVerifier) {}

    async execute(
        authenticationToken: AuthenticateInterface.Request
    ): Promise<AuthenticateInterface.Response> {
        const decodedToken = await this.jwtVerifier.verifyAccessToken(
            authenticationToken
        );

        if (!decodedToken) {
            return new ForbiddenError();
        }

        const decodedTokenString = JSON.stringify(decodedToken);
        const decodedTokenObject = JSON.parse(decodedTokenString);

        return decodedTokenObject.userId;
    }
}