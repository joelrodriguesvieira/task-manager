import { X } from "lucide-react";
import styles from "../styles/task-card.module.css";
import { Task } from "../types/task";
import { useState } from "react";
import ConfirmDeleteModal from "./confirm-delete-modal";

interface TaskCardProps extends Task {
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void | boolean;
  onTaskUpdated: () => void;
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  onEdit,
  onDelete,
  onTaskUpdated,
}: TaskCardProps) {
  const [onShowModalDelete, setOnShowModalDelete] = useState<boolean>(false);

  async function handleDeleteTask() {
    setOnShowModalDelete(true);
  }

  function handleCancelDelete() {
    setOnShowModalDelete(false);
  }

  async function handleConfirmDelete() {
    const sucess = await onDelete(id);
    if (sucess) {
      await onTaskUpdated();
    }     
    setOnShowModalDelete(false);
  }

  return (
    <div className={styles.card_container} id={id}>
      {onShowModalDelete && (
        <ConfirmDeleteModal
          taskTitle={title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className={styles.header_card}>
        <span className={styles.title_card}>{title}</span>
        <button
          className={`${styles.btn_delete} ${styles.delete}`}
          onClick={() => handleDeleteTask()}
        >
          <X size={15} />
        </button>
      </div>

      <p className={styles.description_card}>{description}</p>

      <div className={styles.footer_card}>
        <span className={styles.status_card}>{status}</span>
        <div className={styles.option_btns}>
          <button
            className={styles.btn_edit}
            onClick={() => onEdit({ id, title, description, status })}
          >
            Editar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}
