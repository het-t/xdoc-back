import { Collection } from "mongodb";
import { CreateUserRepository } from "@application/interfaces/repositories/users/CreateUserRepository";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/users/LoadUserByEmailRepository";
import dbConnection from "../helpers/db-connection";
import { mapDocument, objectIdToString } from "../helpers/mapper";

export class UserRepository implements
    CreateUserRepository,
    LoadUserByEmailRepository 
{
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('users');
    }

    async createUser(userData: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
        const collection = await UserRepository.getCollection();
        const { insertedId } = await collection.insertOne({
            ...userData,
            createdAt: Date.now()
        });

        return objectIdToString(insertedId);
    }

    async loadUserByEmail(email: LoadUserByEmailRepository.Request): Promise<LoadUserByEmailRepository.Response> {
        const collection = await UserRepository.getCollection();
        const rawUser = await collection.findOne({ email });
        
        return rawUser && mapDocument(rawUser);
    }
}