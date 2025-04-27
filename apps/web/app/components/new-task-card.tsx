import { X } from "lucide-react";
import styles from "../styles/new-task-card.module.css";
import { FormEvent, useState } from "react";
import { Task, TaskStatus } from "../types/task";

interface NewTaskCardProps {
  status?: TaskStatus;
  onClose?: () => void;
}

export default function NewTaskCard({ status, onClose }: NewTaskCardProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [statusCard, setStatusCard] = useState<TaskStatus>(
    status ?? TaskStatus.TODO
  );

  function handleSaveTask(event: FormEvent) {
    event.preventDefault();

    if (title === "" || description === "" || statusCard === null) {
      return;
    }

    {
      /* SALVAR TAREFA NO BANCO DE DADOS*/
    }
    setTitle("");
    setDescription("");
    setStatusCard(TaskStatus.TODO);
    return;
  }
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <div className={styles.new_card_header}>
          <h1>Criando uma nova Tarefa</h1>
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
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className={styles.input_description}>
              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                id="description"
                placeholder="Descreva sua nova tarefa..."
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

            {status ? (
              <select
                name="status"
                id="status"
                value={status}
                onChange={(event) =>
                  setStatusCard(event.target.value as TaskStatus)
                }
              >
                {Object.values(TaskStatus).map((typeStatus) => (
                  <option key={typeStatus} value={typeStatus}>
                    {typeStatus}
                  </option>
                ))}
              </select>
            ) : (
              <select name="status" id="status">
                {Object.values(TaskStatus).map((typeStatus) => (
                  <option key={typeStatus} value={typeStatus}>
                    {typeStatus}
                  </option>
                ))}
              </select>
            )}

            <button onClick={handleSaveTask}>Salvar tarefa</button>
          </form>
        </div>
      </div>
    </div>
  );
}
