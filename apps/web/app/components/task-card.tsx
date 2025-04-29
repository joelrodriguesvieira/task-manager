import { X } from "lucide-react";
import styles from "../styles/task-card.module.css";
import { Task } from "../types/task";

interface TaskCardProps extends Task {
  onEdit: (task: Task) => void;
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  onEdit,
}: TaskCardProps) {
  return (
    <div className={styles.card_container} id={id}>
      <div className={styles.header_card}>
        <span className={styles.title_card}>{title}</span>
        <button className={`${styles.btn_delete} ${styles.delete}`}>
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
