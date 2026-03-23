import React, { useRef } from "react";
import type { Task } from "../types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 👇 Track drag vs click
  const isDraggingRef = useRef(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={() => {
        isDraggingRef.current = false;
      }}
      onMouseMove={() => {
        isDraggingRef.current = true;
      }}
      onMouseUp={() => {
        if (!isDraggingRef.current) {
          onClick(); // ✅ Only open modal if NOT dragging
        }
      }}
      className="bg-white p-3 rounded-xl shadow cursor-pointer"
    >
      <div className="taskCardDetails">
        <span>Task Name:</span>
        <h3 className="font-bold text-rose-800">{task.name}</h3>
      </div>

      <div className="taskCardDetails">
        <span>Task Description:</span>
        <p className="text-sm text-gray-900">{task.description}</p>
      </div>

      <div className="taskCardDetails">
        <span>Task Status:</span>
        <h3 className="text-sm mt-2 text-gray-900">{task.status}</h3>
      </div>
    </div>
  );
};