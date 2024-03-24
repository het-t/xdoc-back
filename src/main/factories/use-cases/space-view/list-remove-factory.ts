import { ListRemove } from "@application/use-cases/space-view/ListRemove";
import { SpaceViewRepository } from "@infrastructure/db/postgres/repositories/SpaceViewRepository";

export const makeListRemove = (): ListRemove => {
    const spaceViewRepository = new SpaceViewRepository();

    return new ListRemove(spaceViewRepository);
}