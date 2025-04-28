import { Router } from "express";
import { TaskRepository } from "../../repositories/tasks/task.repository.js";
import { TaskService } from "../../services/tasks/task.service.js";
import { TaskController } from "../../controllers/task/tasks.controller.js";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const router = Router();

router.get("/filter", (req, res) => taskController.filterByStatus(req, res));
router.get("/:id", (req, res) => taskController.findById(req, res));
router.post("/", (req, res) => taskController.create(req, res));
router.get("/", (req, res) => taskController.findAll(req, res));
router.put("/:id", (req, res) => taskController.update(req, res));
router.delete("/:id", (req, res) => taskController.delete(req, res));

export { router as taskRoutes };
