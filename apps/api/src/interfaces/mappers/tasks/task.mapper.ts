import { UpdatePutTaskDTO } from "../../../controllers/task/dtos/update-put-task.dto.js";
import { Task } from "../../../models/tasks/task.model.js";

export class TaskMapper {
  static toDomain(data: Partial<UpdatePutTaskDTO>): Partial<Task> {
    let status: "pending" | "in-progress" | "completed";

    switch (data.status) {
      case "a fazer":
        status = "pending";
        break;
      case "em andamento":
        status = "in-progress";
        break;
      case "feita":
        status = "completed";
        break;
      default:
        status = "pending";
        break;
    }

    const taskDomain: Partial<Task> = {
      ...data,
      status: status,
    };

    return taskDomain;
  }
}
