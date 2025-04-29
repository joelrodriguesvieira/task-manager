"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import { Search } from "lucide-react";
import { Task, TaskStatus } from "./types/task";
import TaskCard from "./components/task-card";
import AddTask from "./components/add-task";
import TaskCardModal from "./components/task-card-modal";
import { mapTask } from "./utils/mapper";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [onShowNewTask, setOnShowNewTask] = useState<boolean>(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus | undefined>(
    undefined
  );
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    fetchTasksByStatus("pending", setTodoTasks);
    fetchTasksByStatus("in-progress", setInProgressTasks);
    fetchTasksByStatus("completed", setDoneTasks);
  }, []);

  async function fetchTasksByStatus(
    status: string,
    setter: (tasks: Task[]) => void
  ) {
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/filter?status=${status}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks with status ${status}`);
      }
      const dataJson = await response.json();
      setter(dataJson.map(mapTask));
    } catch (error) {
      console.error(error);
    }
  }

  async function reloadTasks() {
    await Promise.all([
      fetchTasksByStatus("pending", setTodoTasks),
      fetchTasksByStatus("in-progress", setInProgressTasks),
      fetchTasksByStatus("completed", setDoneTasks),
    ]);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  function handleCreateTask(status?: TaskStatus) {
    setNewTaskStatus(status);
    setSelectedTask(undefined);
    setOnShowNewTask(true);
  }

  function handleEditTask(task: Task) {
    setSelectedTask(task);
    setOnShowNewTask(true);
  }

  async function handleDeleteTask(taskId: string): Promise<void | boolean> {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error DELETE fetch: status ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Error to try delete the task:", error);
      return false;
    }
  }

  function handleCloseNewTask() {
    setOnShowNewTask(false);
    setNewTaskStatus(undefined);
  }

  return (
    <div className={styles.container}>
      <header>
        <form className={styles.form_search}>
          <Search size={20}/>
          <input
            type="text"
            placeholder="Busque tarefas por título..."
            onChange={handleSearch}
            className={styles.input_search}
          />
        </form>
      </header>

      <main className={styles.main_container}>
        {onShowNewTask && (
          <TaskCardModal
            task={selectedTask}
            onClose={handleCloseNewTask}
            onTaskUpdated={reloadTasks}
          />
        )}

        <div className={styles.header_main}>
          <h1 className={styles.title_main}>Gerenciador de Tarefas</h1>
          <button
            className={styles.btn_create_task}
            onClick={() => handleCreateTask()}
          >
            Criar tarefa
          </button>
        </div>

        <div className={styles.tasks_columns}>
          <div className={styles.todo_column}>
            <div className={styles.type_column}>
              <h3 className={`${styles.title_box} ${styles.todo_title}`}>
                A Fazer
              </h3>
            </div>
            <div className={styles.cards}>
              <div className={styles.todo_cards}>
                {todoTasks
                  .filter((task) =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onTaskUpdated={reloadTasks}
                      type={TaskStatus.TODO}
                    />
                  ))}
              </div>
              <div className={styles.footer_cards}>
                <AddTask onClick={() => handleCreateTask(TaskStatus.TODO)} />
              </div>
            </div>
          </div>

          <div className={styles.progress_column}>
            <div className={styles.type_column}>
              <h3 className={`${styles.title_box} ${styles.in_progress_title}`}>
                Em Progresso
              </h3>
            </div>
            <div className={styles.cards}>
              <div className={styles.progress_cards}>
                {inProgressTasks
                  .filter((task) =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onTaskUpdated={reloadTasks}
                      type={TaskStatus.IN_PROGRESS}
                    />
                  ))}
              </div>
              <div className={styles.footer_cards}>
                <AddTask
                  onClick={() => handleCreateTask(TaskStatus.IN_PROGRESS)}
                />
              </div>
            </div>
          </div>

          <div className={styles.done_column}>
            <div className={styles.type_column}>
              <h3 className={`${styles.title_box} ${styles.done_title}`}>
                Finalizada
              </h3>
            </div>
            <div className={styles.cards}>
              <div className={styles.done_cards}>
                {doneTasks
                  .filter((task) =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onTaskUpdated={reloadTasks}
                      type={TaskStatus.DONE}
                    />
                  ))}
              </div>
              <div className={styles.footer_cards}>
                <AddTask onClick={() => handleCreateTask(TaskStatus.DONE)} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
