import { IOperation } from "./IOperation";

export type ITransaction = {
    id: string;
    debug: object;
    operations: IOperation[];
    spaceId: string;
}