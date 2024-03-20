export namespace IGetTasksRepository {
    export type Request = Array<string>;
    export type Response = Array<object>;
}

export interface IGetTasksRepository {
    getTasksById(
        taskIds: IGetTasksRepository.Request
    ): Promise<IGetTasksRepository.Response>;
}