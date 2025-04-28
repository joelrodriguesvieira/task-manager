import { Request, Response } from "express";
import { TaskService } from "../../services/tasks/task.service.js";
import { FilterByStatusDTO } from "./dtos/filter-by-status.dto.js";
import { CreateTaskDTO } from "./dtos/create-task.dto.js";
import { FindByIdParamDTO } from "./dtos/find-by-id.dto.js";
import { UpdatePutTaskDTO } from "./dtos/update-put-task.dto.js";
import { TaskMapper } from "../../interfaces/mappers/tasks/task.mapper.js";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async create(req: Request, res: Response): Promise<Response> {
    const data: Partial<CreateTaskDTO> = req.body;
    const taskMapper = TaskMapper.toDomain(data);
    const task = await this.taskService.createTask(taskMapper);
    return res.status(201).json(task);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.getAllTasks();
    return res.json(tasks);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const task = await this.taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const data: Partial<UpdatePutTaskDTO> = req.body;
    const taskMapper = TaskMapper.toDomain(data);
    const updated = await this.taskService.updateTask(
      req.params.id,
      taskMapper
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    return res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.taskService.deleteTask(req.params.id);
    return res.status(204).send();
  }

  async filterByStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.query as Partial<FilterByStatusDTO>;
    const tasks = await this.taskService.filterTasksByStatus(status);
    return res.status(200).json(tasks);
  }
}
