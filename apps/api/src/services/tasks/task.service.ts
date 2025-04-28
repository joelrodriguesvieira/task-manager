import { ITaskRepository } from "../../interfaces/tasks/task.implement.js";
import { Task } from "../../models/tasks/task.model.js";

export class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(data: any): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task | null> {
    return this.taskRepository.update(id, task);
  }

  async deleteTask(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }

  async filterTasksByStatus(status: string | undefined): Promise<Task[]> {
    if (!status) throw new Error("Status is required");
    return this.taskRepository.filter(status);
  }
}
