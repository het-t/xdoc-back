import { pool } from "../helpers/db-connection";
import { IEnqueueTaskRepository } from "@application/interfaces/repositories/enqueue-tasks/IEnqueueTaskRepository";
import { IGetTasksRepository } from "@application/interfaces/repositories/get-tasks/IGetTasksRepository";

export class TaskRepository implements 
    IEnqueueTaskRepository,
    IGetTasksRepository
{
    async duplicateBlock(
        { appendContentOnly, deepCopyTransculsionContainers, isTemplateInstantiation, resolveTemplateVariables, sourceBlocks, targetBlocks }: IEnqueueTaskRepository.Request
    ): Promise<IEnqueueTaskRepository.Response> {
        return "";
    }

    async getTasksById(taskIds: IGetTasksRepository.Request): Promise<IGetTasksRepository.Response> {
        return [];
    }
}