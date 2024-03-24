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

    async verifyAccessToken(token: string): Promise<string> {
        try {
            return jwt.verify(token, this.authenticationTokenSecret) as string
        } catch (error) {
            return "null";
        }
    }

    async verifyRefreshToken(token: string): Promise<string> {
        try {
            return jwt.verify(token, this.refreshTokenSecret) as string
        } catch (error) {
            return "null";
        }
    }
}