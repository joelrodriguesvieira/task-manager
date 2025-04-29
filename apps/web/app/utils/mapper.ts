import { Task, TaskStatus } from "../types/task";

export function mapTask(taskFromApi: any): Task {
  return {
    id: taskFromApi._id,
    title: taskFromApi.title,
    description: taskFromApi.description,
    status: mapStatus(taskFromApi.status),
  };
}

function mapStatus(apiStatus: string): TaskStatus {
  switch (apiStatus) {
    case "pending":
      return TaskStatus.TODO;
    case "in-progress":
      return TaskStatus.IN_PROGRESS;
    case "completed":
      return TaskStatus.DONE;
    default:
      throw new Error(`Unknown status from API: ${apiStatus}`);
  }
}
