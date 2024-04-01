import { IAuthenticateInterface } from "@application/interfaces/use-cases/users/IAuthenticateInterface";
import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";
import { ForbiddenError } from "@application/errors/ForbiddenError";

export class Authenticate implements IAuthenticateInterface {
    constructor(private readonly jwtVerifier: JWTVerifier) {}

    async execute(
        authenticationToken: IAuthenticateInterface.Request
    ): Promise<IAuthenticateInterface.Response> {
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