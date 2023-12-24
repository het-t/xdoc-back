import { UseCase } from "../UseCase";
import { IPointer } from "@infrastructure/http/interfaces/IOperation";

export namespace ICollectionViewUpdate {
    export type Request = {
        pointer: IPointer,
        path: string[],
        args: {
            table_properties?: Array<{
                property: string,
                visible: boolean
            }>
        }
    }
    export type Response = void;
}
export interface ICollectionViewUpdate extends UseCase<
    ICollectionViewUpdate.Request,
    ICollectionViewUpdate.Response
> {
    execute(
        { pointer, args }: ICollectionViewUpdate.Request
    ): Promise<ICollectionViewUpdate.Response>
}