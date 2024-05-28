import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { CreateEmailUserController } from "@infrastructure/http/controllers/create-email-user/CreateEmailUserController";
import { makeCreateUser } from "@main/factories/use-cases/users/create-user-factory";
import { makeLoadUserByEmail } from "@main/factories/use-cases/users/load-user-by-email-factory";

export const makeCreateEmailUser = (): BaseController => {
    const loadUserByEmail = makeLoadUserByEmail();
    const createUser = makeCreateUser();

    return new CreateEmailUserController(
        loadUserByEmail,
        createUser
    );
}