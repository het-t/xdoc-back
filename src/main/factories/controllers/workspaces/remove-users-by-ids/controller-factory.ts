import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { RemoveUsersController } from "@infrastructure/http/controllers/workspaces/RemoveUsersController";
import { makeRemoveUsersByIds } from "@main/factories/use-cases/workspaces/remove-users-by-ids-factory";

export const makeRemoveUsersFromSpaceController = (): BaseController => {
    const removeUsersByIdsUsecase = makeRemoveUsersByIds();

    return new RemoveUsersController(
        removeUsersByIdsUsecase
    );
}