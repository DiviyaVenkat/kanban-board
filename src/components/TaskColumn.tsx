import { useTasks } from "../context/TaskContent";
import { TaskCard } from "./TaskCard";
import type { TaskStatus } from "../types/Task";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export const Column: React.FC<{
  title: string;
  columnKey: TaskStatus;
}> = ({ title, columnKey }) => {
  const { tasks, setSelectedTask, deleteTask  } = useTasks();

  const { setNodeRef, isOver } = useDroppable({
    id: columnKey,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        w-80 p-4 rounded-2xl transition-all duration-200 taskCard-Column
        ${
          isOver
            ? "bg-blue-100 border-2 border-blue-400 shadow-lg scale-[1.02]"
            : "bg-gray-100"
        }
      `}
    >
      {/* Column Title */}
      <h2 className="text-xl font-bold mb-3 column-title">{title}</h2>

      <SortableContext
        items={tasks[columnKey].map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[120px] relative">
          
          {/* 🔥 Drop indicator (top) */}
          {isOver && tasks[columnKey].length === 0 && (
            <div className="h-2 bg-blue-400 rounded animate-pulse mb-2" />
          )}

          {tasks[columnKey].map((task) => (
            <TaskCard
              key={task.id} // ✅ IMPORTANT
              task={task}
              onEdit={() => setSelectedTask(task)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}

          {/* 🔥 Drop indicator (bottom fallback) */}
          {isOver && tasks[columnKey].length > 0 && (
            <div className="h-2 bg-blue-400 rounded animate-pulse mt-2" />
          )}
        </div>
      </SortableContext>
    </div>
  );
};