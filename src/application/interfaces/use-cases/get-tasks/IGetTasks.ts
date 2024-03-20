import { UseCase } from "../UseCase";

export namespace IGetTasks {
    export type Request = Array<string>;
    export type Response = Array<object>;
}

export interface IGetTasks extends UseCase<
    IGetTasks.Request,
    IGetTasks.Response
> {
    execute(
        taskIds: IGetTasks.Request
    ): Promise<IGetTasks.Response>;
}