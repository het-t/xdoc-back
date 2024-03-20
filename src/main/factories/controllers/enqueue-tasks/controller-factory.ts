import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { EnqueueTaskController } from "@infrastructure/http/controllers/enqueue-tasks/EnqueueTaskController";
import { makeEnqueueTask } from "@main/factories/use-cases/enqueue-tasks/enqueue-task-factory";

export const makeEnqueueTaskController = (): BaseController => {
    
    const enqueueTaskUsecase = makeEnqueueTask();

    return new EnqueueTaskController(enqueueTaskUsecase);
}