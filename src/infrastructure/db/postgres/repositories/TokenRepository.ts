import { ICreateTokenRepository } from "@application/interfaces/repositories/tokens/ICreateTokenRepository";
import { IDeleteTokenRepository } from "@application/interfaces/repositories/tokens/IDeleteTokenRepository";
import { IGetTokenRepository } from "@application/interfaces/repositories/tokens/IGetTokenRepository";

export class TokenRepository implements
    ICreateTokenRepository,
    IDeleteTokenRepository,
    IGetTokenRepository
{
    createToken(token: string): Promise<string> {
        return 
    }

    deleteToken(token: string): Promise<void> {
        return
    }

    getToken(token: string): Promise<{ _id: string; token: string; createdAt: Date; }> {
        return
    }
}