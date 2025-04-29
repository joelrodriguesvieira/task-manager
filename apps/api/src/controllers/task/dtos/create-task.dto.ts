export interface CreateTaskDTO {
  title: string;
  description: string;
  status: "A fazer" | "Em andamento" | "Feita";
}
