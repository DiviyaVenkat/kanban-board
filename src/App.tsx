import { useState } from "react";
import { TaskProvider, useTasks } from "./context/TaskContent";
import { Column } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";
import { TaskModal } from "./components/TaskModal";

import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

import type { TaskStatus, Task } from "./types/Task";

const Board = () => {
  const { tasks, moveTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const findContainer = (id: string): TaskStatus | undefined => {
    if (id in tasks) return id as TaskStatus;

    return (Object.keys(tasks) as TaskStatus[]).find((key) =>
      tasks[key].some((t) => t.id === id)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = Object.values(tasks)
      .flat()
      .find((t) => t.id === event.active.id);

    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const sourceCol = findContainer(active.id as string);
    const destCol = findContainer(over.id as string);

    if (!sourceCol || !destCol) {
      setActiveTask(null);
      return;
    }

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

    setActiveTask(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TaskForm />
      <TaskModal />

      <div className="flex gap-6 justify-center column-display-holder">
        <Column title="To Do" columnKey="todo" />
        <Column title="In Progress" columnKey="inProgress" />
        <Column title="Done" columnKey="done" />
      </div>

      {/* 🔥 Smooth Overlay */}
      <DragOverlay
        dropAnimation={{
          duration: 250,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)", // smooth easing
        }}
      >
        {activeTask ? (
          <div className="bg-white p-3 rounded-xl shadow-2xl w-64 scale-105 rotate-1 opacity-95 pointer-events-none transition-all">
            <h3 className="font-bold text-rose-800">
              {activeTask.name}
            </h3>
            <p className="text-sm">{activeTask.description}</p>
            <p className="text-xs mt-2">
              {activeTask.status} • {activeTask.priority}
            </p>
          </div>
        ) : null}
      </DragOverlay>
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