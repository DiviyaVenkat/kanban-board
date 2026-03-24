export type TaskStatus = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  name: string;
  priority: string;
  description: string;
  status: TaskStatus;
}