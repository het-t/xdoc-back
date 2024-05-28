import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { FindUserConroller } from "@infrastructure/http/controllers/find-user/FindUserController";
import { makeLoadUserByEmail } from "@main/factories/use-cases/users/load-user-by-email-factory";

export const makeFindUserController = (): BaseController => {
    const loadUserByEmail = makeLoadUserByEmail();

    return new FindUserConroller(loadUserByEmail);
}