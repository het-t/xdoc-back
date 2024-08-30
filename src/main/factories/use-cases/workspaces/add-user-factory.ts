import { AddUser } from "@application/use-cases/spaces/AddUser";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeAddUser = (): AddUser => {
    const addUserRepository = new WorkspaceRepository();

    return new AddUser(
        addUserRepository
    );
}