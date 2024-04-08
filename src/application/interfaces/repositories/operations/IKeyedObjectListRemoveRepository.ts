import { IOperation } from "@domain/entities/ITransaction";

export namespace IKeyedObjectListRemoveRepository {
    export type Request = IOperation;
    export type Response = void;
}

export interface IKeyedObjectListRemoveRepository {
    keyedObjectListRemoveOperation(
        o: IKeyedObjectListRemoveRepository.Request
    ): Promise<IKeyedObjectListRemoveRepository.Response>;
}