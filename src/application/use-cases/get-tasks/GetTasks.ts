import { IGetTasksRepository } from "@application/interfaces/repositories/get-tasks/IGetTasksRepository";
import { IGetTasks } from "@application/interfaces/use-cases/get-tasks/IGetTasks";

export class GetTask implements IGetTasks {
    constructor(
        private readonly getTasksRepository: IGetTasksRepository
    ) {}

    async execute(
        taskIds: IGetTasks.Request
    ): Promise<IGetTasks.Response> {
        return await this.getTasksRepository.getTasksById(taskIds);
    }
}