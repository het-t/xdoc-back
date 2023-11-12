import { CreateUserRepository } from "@application/interfaces/repositories/users/CreateUserRepository";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/users/LoadUserByEmailRepository";
import { User } from "@domain/entities/user";

export class UserRepository implements
    CreateUserRepository,
    LoadUserByEmailRepository 
{
    createUser(userData: CreateUserRepository.Request): string {
        return ''
    }

    loadUserByEmail(email: string): User {
        return new User({id: undefined, email: undefined, password: undefined, isDarkMode: undefined, createdAt: undefined, editedAt: undefined, profilePicture: undefined, workspaces: []});
    }
}