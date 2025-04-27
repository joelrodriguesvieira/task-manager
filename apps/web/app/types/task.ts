export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export enum TaskStatus {
  TODO = "pendente",
  IN_PROGRESS = "em andamento",
  DONE = "feita",
}
