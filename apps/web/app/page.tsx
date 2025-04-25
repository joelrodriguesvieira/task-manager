"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { Plus, Search } from "lucide-react";
import { Task } from "./types/task";
import TaskCard from "./components/task-card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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
        <div className={styles.header_main}>
          <h1 className={styles.title_main}>Gerenciador de Tarefas</h1>
          <button className={styles.btn_create_task}>Criar tarefa</button>
        </div>

        <div className={styles.tasks_columns}>
          <div className={styles.todo_column}>
            <div className={styles.type_column}>
              <h3>A Fazer</h3>
              <button className={styles.create_card_column}>
                <Plus size={18} />
              </button>
            </div>
            <div className={styles.todo_cards}>
              <TaskCard />
            </div>
          </div>

          <div className={styles.progress_column}>
            <div className={styles.type_column}>
              <h3>Em Progresso</h3>
              <button className={styles.create_card_column}>
                <Plus size={18} />
              </button>
            </div>
            <div className={styles.progress_cards}></div>
          </div>
          <div className={styles.done_column}>
            <div className={styles.type_column}>
              <h3>Finalizada</h3>
              <button className={styles.create_card_column}>
                <Plus size={18} />
              </button>
            </div>
            <div className={styles.done_cards}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
