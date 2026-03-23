import { createContext, useContext, useEffect, useState } from "react";
import type { Task, TaskStatus } from "../types/Task";

const STORAGE_KEY = "kanban_tasks";

interface TaskContextType {
  tasks: Record<TaskStatus, Task[]>;
  addTask: (task: Task) => void;
  updateTask: (updated: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (source: any, destination: any) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Record<TaskStatus, Task[]>>(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : {
        todo: [],
        inProgress: [],
        done: [],
      };
      
});

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks((prev) => ({
      ...prev,
      [task.status]: [...prev[task.status], task],
    }));
  };

  const updateTask = (updated: Task) => {
    setTasks((prev) => {
      const newState = { ...prev };
      (Object.keys(newState) as TaskStatus[]).forEach((col) => {
        newState[col] = newState[col].filter((t) => t.id !== updated.id);
      });
      newState[updated.status].push(updated);
      return newState;
    });
    setSelectedTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const newState = { ...prev };
      (Object.keys(newState) as TaskStatus[]).forEach((col) => {
        newState[col] = newState[col].filter((t) => t.id !== id);
      });
      return newState;
    });
    setSelectedTask(null);
  };

  const moveTask = (source: any, destination: any) => {
    if (!destination) return;

    const sourceCol = source.droppableId as TaskStatus;
    const destCol = destination.droppableId as TaskStatus;

    const sourceItems = Array.from(tasks[sourceCol]);
    const destItems = Array.from(tasks[destCol]);

    const [moved] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, moved);
      setTasks((prev) => ({ ...prev, [sourceCol]: sourceItems }));
    } else {
      moved.status = destCol;
      destItems.splice(destination.index, 0, moved);
      setTasks((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      }));
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask, selectedTask, setSelectedTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within provider");
  return ctx;
};
