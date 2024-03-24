import { GetTask } from "@application/use-cases/get-tasks/GetTasks";
import { TaskRepository } from "@infrastructure/db/postgres/repositories/TaskRepository";

export const makeGetTasks = (): GetTask => {
    const getTasksRepository = new TaskRepository();

    return new GetTask(getTasksRepository);
}