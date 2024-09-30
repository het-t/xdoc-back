import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { CreateEmailUserController } from "@infrastructure/http/controllers/create-email-user/CreateEmailUserController";
import { makeCreateEmailUser } from "@main/factories/use-cases/users/create-email-user-factory";
import { makeLoadUserByEmail } from "@main/factories/use-cases/users/load-user-by-email-factory";

export const makeCreateEmailUserController = (): BaseController => {
    const loadUserByEmail = makeLoadUserByEmail();
    const createEmailUser = makeCreateEmailUser();

    return new CreateEmailUserController(
        loadUserByEmail,
        createEmailUser
    );
}