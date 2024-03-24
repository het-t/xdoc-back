import { ListBefore } from "@application/use-cases/space-view/ListBefore";
import { SpaceViewRepository } from "@infrastructure/db/postgres/repositories/SpaceViewRepository";

export const makeListBefore = (): ListBefore => {
    const spaceViewRepository = new SpaceViewRepository();

    return new ListBefore(spaceViewRepository);
}