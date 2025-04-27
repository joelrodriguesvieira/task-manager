import { Plus } from "lucide-react";
import { TaskStatus } from "../types/task";
import styles from "../styles/add-task.module.css"

type AddTaskProps = {
  status: TaskStatus;
};

export default function AddTask({ status }: AddTaskProps) {
  return (
    <button className={styles.main_button}>
      <Plus size={20} />
      <span>Nova tarefa</span>
    </button>
  );
}
