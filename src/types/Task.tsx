export type TaskStatus = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
}