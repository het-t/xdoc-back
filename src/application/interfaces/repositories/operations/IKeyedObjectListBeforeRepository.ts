import { IOperation } from "@domain/interfaces/ITransaction";

export namespace IKeyedObjectListBeforeRepository {
    export type Request = IOperation;
    export type  Response = void;
}

export interface IKeyedObjectListBeforeRepository {
    keyedObjectListBeforeOperation(
        o: IKeyedObjectListBeforeRepository.Request
    ): Promise<IKeyedObjectListBeforeRepository.Response>;
}