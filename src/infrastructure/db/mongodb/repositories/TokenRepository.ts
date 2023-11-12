import { CreateTokenRepository } from "@application/interfaces/repositories/tokens/CreateTokenRepository";
import { DeleteTokenRepository } from "@application/interfaces/repositories/tokens/DeleteTokenRepository";
import { GetTokenRepository } from "@application/interfaces/repositories/tokens/GetTokenRepository";

export class TokenRepository implements
    CreateTokenRepository,
    DeleteTokenRepository,
    GetTokenRepository
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