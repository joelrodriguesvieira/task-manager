import { Pen, X } from "lucide-react";
import styles from "../styles/task-card.module.css";

export default function TaskCard() {
  return (
    <div className={styles.card_container}>
      <div className={styles.header_card}>
        <span className={styles.title_card}>Estudar Geografia</span>
        <button className={`${styles.btn_delete} ${styles.delete}`}>
          <X size={15} />
        </button>
      </div>

      <p className={styles.description_card}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, sequi dit
        nisi?
      </p>

      <div className={styles.footer_card}>
        <span className={styles.status_card}>A fazer</span>
        <div className={styles.option_btns}>
          <button className={styles.btn_edit}>
            Editar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}
