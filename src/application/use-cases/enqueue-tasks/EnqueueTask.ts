import { IEnqueueTaskRepository } from "@application/interfaces/repositories/enqueue-tasks/IEnqueueTaskRepository";
import { IEnqueueTask } from "@application/interfaces/use-cases/enqueue-tasks/IEnqueueTask";

export class EnqueueTask implements IEnqueueTask {
    constructor(
        private readonly enqueueTaskRepository: IEnqueueTaskRepository
    ) {}

    async execute({ eventName, request }: IEnqueueTask.Request): Promise<string> {
        if (eventName === 'duplicateBlock') {
            return await this.enqueueTaskRepository.duplicateBlock(request);
        }

        throw new Error("Invalid event");
    }
}