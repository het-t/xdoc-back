import { EnqueueTask } from "@application/use-cases/enqueue-tasks/EnqueueTask";
import { TaskRepository } from "@infrastructure/db/mongodb/repositories/TaskRepository";

export const makeEnqueueTask = (): EnqueueTask => {
    const enqueueTaskRepository = new TaskRepository();

    return new EnqueueTask(enqueueTaskRepository);
}