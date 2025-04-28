export interface CreateTaskDTO {
  title: string;
  description: string;
  status: "a fazer" | "em andamento" | "feita";
}
