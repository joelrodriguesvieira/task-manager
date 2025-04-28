import { Task } from "../../models/tasks/task.model.js";

export interface ITaskRepository {
  create(data: any): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, task: Partial<Task>): Promise<Task | null>;
  delete(id: string): Promise<void>;
  filter(status: string): Promise<Task[]>;
}
