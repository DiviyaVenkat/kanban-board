import { useTasks } from "../context/TaskContent";
import { TaskCard } from "./TaskCard";
import type { TaskStatus } from "../types/Task";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export const Column: React.FC<{ title: string; columnKey: TaskStatus }> = ({
  title,
  columnKey,
}) => {
  const { tasks, setSelectedTask } = useTasks();

  // ✅ Make column droppable
  const { setNodeRef, isOver } = useDroppable({
    id: columnKey,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 p-4 rounded-2xl w-80 transition ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <SortableContext
        items={tasks[columnKey].map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 min-h-[100px] taskCard-Column">
          {tasks[columnKey].map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => setSelectedTask(task)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};