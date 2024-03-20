import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { Collection } from "@domain/entities/collection";
import { UseCase } from "../UseCase";

export namespace ICollectionLoadById {
    export type Request = string;
    export type Response = Collection | BlockNotFoundError;
}

export interface ICollectionLoadById extends UseCase<
    ICollectionLoadById.Request,
    ICollectionLoadById.Response
> {
    execute(
        id: ICollectionLoadById.Request
    ): Promise<ICollectionLoadById.Response>
}