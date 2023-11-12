import bcrypt from 'bcrypt';
import { HashCompare } from "@application/interfaces/cyptography/HashCompare";
import { HashGenerator } from "@application/interfaces/cyptography/HashGenerator";

export class BcryptAdaptor implements
    HashCompare,
    HashGenerator
{
    constructor(public readonly salt: number) { }
    
    async compare(
        plainText: string,
        hash: string
    ): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    }

    async hash(
        payload: string
    ): Promise<string> {
        return bcrypt.hash(payload, this.salt);
    }
}