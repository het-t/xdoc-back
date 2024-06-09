import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { GetVisibleUsers } from "@infrastructure/http/controllers/get-visible-users/GetVisibleUsers";
import { makeGetSpaceUsersBySpaceId } from "@main/factories/use-cases/users/get-space-users-by-space-id-factory";

export const makeGetVisibleUsersController = (): BaseController => {
    const getUsersBySpaceIdUsecase = makeGetSpaceUsersBySpaceId();

    return new GetVisibleUsers(getUsersBySpaceIdUsecase);
}