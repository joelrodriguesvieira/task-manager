import { ITaskRepository } from "../../interfaces/tasks/task.implement.js";
import { TaskModel, Task } from "../../models/tasks/task.model.js";

export class TaskRepository implements ITaskRepository {
  async create(data: any): Promise<Task> {
    return await TaskModel.create(data);
  }

  async findAll(): Promise<Task[]> {
    return await TaskModel.find();
  }

  async findById(id: string): Promise<Task | null> {
    return await TaskModel.findById(id);
  }

  async update(id: string, task: Partial<Task>): Promise<Task | null> {
    return await TaskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: string): Promise<void> {
    await TaskModel.findByIdAndDelete(id);
  }

  async filter(status: string): Promise<Task[]> {
    return TaskModel.find({ status: status });
  }
}
