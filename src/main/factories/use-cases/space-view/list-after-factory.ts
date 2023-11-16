import { ListAfter } from "@application/use-cases/space-view/ListAfter";
import { SpaceViewRepository } from "@infrastructure/db/mongodb/repositories/SpaceViewRepository";

export const makeListAfter = (): ListAfter => {
    const spaceViewRepository = new SpaceViewRepository();

    return new ListAfter(spaceViewRepository);
}