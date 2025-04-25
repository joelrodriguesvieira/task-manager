"use client";

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { Search } from "lucide-react";
import { Task } from "./types/task";

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
    <main className={styles.main_container}>
      <header>
        <form className={styles.form_search}>
         <Search size={20} className={styles.icon_search}/>
          <input
            type="text"
            placeholder="Busque suas tarefas..."
            onChange={handleSearch}
            className={styles.input_search}
          />
        </form>
      </header>
    </main>
  );
}
