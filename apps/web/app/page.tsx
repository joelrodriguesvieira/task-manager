"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { Search } from "lucide-react";
import { Task, TaskStatus } from "./types/task";
import TaskCard from "./components/task-card";
import AddTask from "./components/add-task";
import NewTaskCard from "./components/new-task-card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [onShowNewTask, setOnShowNewTask] = useState<boolean>(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus | undefined>(
    undefined
  );

  const filteredTasks =
    search !== ""
      ? tasks.filter((task) =>
          task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : tasks;

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  function handleCreateTask(status?: TaskStatus) {
    setNewTaskStatus(status)
    setOnShowNewTask(true);
  }

  function handleCloseNewTask() {
    setOnShowNewTask(false);
    setNewTaskStatus(undefined);
  }

  return (
    <div className={styles.container}>
      <header>
        <form className={styles.form_search}>
          <Search size={20} className={styles.icon_search} />
          <input
            type="text"
            placeholder="Busque suas tarefas..."
            onChange={handleSearch}
            className={styles.input_search}
          />
        </form>
      </header>

      <main className={styles.main_container}>
        {onShowNewTask && (
          <NewTaskCard status={newTaskStatus} onClose={handleCloseNewTask} />
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
                <TaskCard />
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
              {/* PARTE QUE VAI O CARD*/}
              <div className={styles.progress_cards}>
                <TaskCard />
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
              {/* PARTE QUE VAI O CARD*/}
              <div className={styles.done_cards}></div>
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
