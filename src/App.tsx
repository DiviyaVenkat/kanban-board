import { TaskProvider, useTasks } from "./context/TaskContent";
import { Column } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";
import { TaskModal } from "./components/TaskModal";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { TaskStatus } from "./types/Task";

const Board = () => {
  const { tasks, moveTask } = useTasks();

  const findContainer = (id: string): TaskStatus | undefined => {
    if (id in tasks) return id as TaskStatus;

    return (Object.keys(tasks) as TaskStatus[]).find((key) =>
      tasks[key].some((t) => t.id === id)
    );
  };

  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceCol = findContainer(active.id as string);
    const destCol = findContainer(over.id as string);

    if (!sourceCol || !destCol) return;

    const sourceIndex = tasks[sourceCol].findIndex(
      (t) => t.id === active.id
    );

    const destIndex = tasks[destCol].findIndex(
      (t) => t.id === over.id
    );

    moveTask(
      { droppableId: sourceCol, index: sourceIndex },
      {
        droppableId: destCol,
        index: destIndex >= 0 ? destIndex : tasks[destCol].length,
      }
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <TaskForm />
      <TaskModal />

      <div className="flex gap-6 justify-center items-start column-display-holder xs:flex-col">
        <Column title="To Do" columnKey="todo" />
        <Column title="In Progress" columnKey="inProgress" />
        <Column title="Done" columnKey="done" />
      </div>
    </DndContext>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}