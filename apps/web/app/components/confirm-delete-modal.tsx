import styles from "../styles/confirm-delete-modal.module.css";

interface ConfirmDeleteModalProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  taskTitle,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Excluir Tarefa</h2>
        <p>
          Tem certeza que deseja excluir a tarefa <strong>{taskTitle}</strong>?
        </p>
        <div className={styles.button_group}>
          <button className={styles.cancel_button} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirm_button} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
