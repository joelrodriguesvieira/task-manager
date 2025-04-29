import { TaskStatus } from "../types/task";

export function getCardClassByStatus(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.TODO:
      return "pending";
    case TaskStatus.IN_PROGRESS:
      return "in-progress";
    case TaskStatus.DONE:
      return "completed";
    default:
      return "";
  }
}
