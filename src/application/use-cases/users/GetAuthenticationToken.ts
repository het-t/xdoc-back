import { ForbiddenError } from "@application/errors/ForbiddenError";
import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";
import { IGetTokenRepository } from "@application/interfaces/repositories/tokens/IGetTokenRepository";
import { IGetAuthenticationTokenInterface } from "@application/interfaces/use-cases/users/IGetAuthenticationTokenInterface";

export class GetAuthenticationToken implements IGetAuthenticationTokenInterface {
    constructor(
        private readonly getTokenRepository: IGetTokenRepository,
        private readonly jwtVerifier: JWTVerifier,
        private readonly jwtGenerator: JWTGenerator
    ) {}

    async execute(
        token: string
    ): Promise<IGetAuthenticationTokenInterface.Response> {
        const storedToken = await this.getTokenRepository.getToken(token);

        if (!storedToken) {
            return new InvalidTokenError();
        }

        const decodedToken = this.jwtVerifier.verifyRefreshToken(token);

        if (!decodedToken) {
            return new ForbiddenError();
        }

        const stringifyDecodedToken = JSON.stringify(decodedToken);
        const parsedDecodedToken = JSON.parse(stringifyDecodedToken);

        const accessToken = await this.jwtGenerator.generateAccessToken(
            parsedDecodedToken.userId
        )

        return {
            accessToken
        }
    }
}