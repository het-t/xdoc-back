import * as jwt from "jsonwebtoken";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";

export class JWTAdaptor implements
    JWTVerifier,
    JWTGenerator
{
    constructor(
        private readonly authenticationTokenSecret: string,
        private readonly refreshTokenSecret: string
    ) { }
    
    async generateAccessToken(payload: string): Promise<string> {
        return jwt.sign({ userId: payload }, this.authenticationTokenSecret, {
            expiresIn: '1d'
        });
    }

    async generateRefreshToken(payload: string): Promise<string> {
        return jwt.sign({ userId: payload }, this.refreshTokenSecret);
    }

    verifyAccessToken(token: string): string | object {
        return jwt.verify(token, this.authenticationTokenSecret)
    }

    verifyRefreshToken(token: string): string | object {
        return jwt.verify(token, this.refreshTokenSecret)
    }
}