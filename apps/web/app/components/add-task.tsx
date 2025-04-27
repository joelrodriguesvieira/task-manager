import { Plus } from "lucide-react";
import { TaskStatus } from "../types/task";
import styles from "../styles/add-task.module.css";

interface AddTaskProps {
  onClick: (status?: TaskStatus) => void;
}

export default function AddTask({ onClick }: AddTaskProps) {
  return (
    <button className={styles.main_button} onClick={() => onClick()}>
      <Plus size={20} />
      <span>Nova tarefa</span>
    </button>
  );
}
