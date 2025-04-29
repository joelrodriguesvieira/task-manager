export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export enum TaskStatus {
  TODO = "Pendente",
  IN_PROGRESS = "Em andamento",
  DONE = "Feita",
}
