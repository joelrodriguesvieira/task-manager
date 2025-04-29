import { X } from "lucide-react";
import styles from "../styles/modal-task-card.module.css";
import { FormEvent, useState } from "react";
import { Task, TaskStatus } from "../types/task";

interface NewTaskCardProps {
  task?: Task;
  onClose?: () => void;
  onTaskUpdated?: () => void;
}

export default function ModalTaskCard({ task, onClose, onTaskUpdated }: NewTaskCardProps) {
  const [title, setTitle] = useState<string>(task?.title ?? "");
  const [description, setDescription] = useState<string>(
    task?.description ?? ""
  );
  const [statusCard, setStatusCard] = useState<TaskStatus>(
    (task?.status as TaskStatus) ?? TaskStatus.TODO
  );

  async function handleEventTask(event: FormEvent) {
    event.preventDefault();

    if (title === "" || description === "" || statusCard === null) return;

    try {
      if (task) {
        await editTask({ ...task, title, description, status: statusCard });
      } else {
        await saveTask({ title, description, status: statusCard });
      }
      onTaskUpdated?.();
      setTitle("");
      setDescription("");
      setStatusCard(TaskStatus.TODO);

      onClose?.();
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTask(data: Partial<Task>) {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Erro to send date:", error);
      throw error;
    }
  }

  async function editTask(data: Partial<Task>) {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error to update date:", error);
      throw error;
    }
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.new_card_header}>
          <h1>{task ? "Editando Tarefa" : "Criando uma nova Tarefa"}</h1>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.new_card_details}>
          <form>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Título da Tarefa..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className={styles.input_description}>
              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                id="description"
                placeholder="Descreva sua nova tarefa..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

            <select
              name="status"
              id="status"
              value={statusCard}
              onChange={(e) => setStatusCard(e.target.value as TaskStatus)}
            >
              {Object.values(TaskStatus).map((typeStatus) => (
                <option key={typeStatus}>
                  {typeStatus}
                </option>
              ))}
            </select>

            <button onClick={handleEventTask}>
              {task ? "Salvar alterações" : "Salvar tarefa"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
