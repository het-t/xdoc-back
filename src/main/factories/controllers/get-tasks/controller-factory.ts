import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { GetTasksController } from "@infrastructure/http/controllers/get-tasks/GetTasksController";
import { makeGetTasks } from "@main/factories/use-cases/get-tasks/get-tasks-factory";

export const makeGetTasksController = (): BaseController => {
    const getTasksUsecase = makeGetTasks();

    return new GetTasksController(getTasksUsecase);
}