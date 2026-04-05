import React from "react";
import type { Task } from "../types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import edit from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";


export const TaskCard: React.FC<{
  task: Task;
  onEdit: () => void;
  onDelete: () => string | void;
}> = ({ task, onEdit, onDelete }) => {
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
    transition: transition || "transform 250ms cubic-bezier(0.25, 1, 0.5, 1)",
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-400 text-rose-800";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-400 text-yellow-500";
      case "Low":
        return "bg-green-100 text-green-700 border-green-400 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded-xl duration-200 task-card-info"
    >
      
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400" title="Drag & Drop"
      >
        ☰
      </div>

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-rose-800">{task.name}</h3>


      </div>

      <p className="text-sm">{task.description}</p>
      <div className="text-xs mt-2 flex justify-between bottom-bar-card-list">
        <div className="left-align-priority">
          <span className="capitalize">{task.status}</span>
        <span
          className={`text-xs px-4 py-1 rounded-full capitalize border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        </div>
        <div className="bottomBar-editdelete">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-500 hover:text-blue-600"
        >
          <img src={edit} title="Edit" />
        </button>
        <button
      onClick={(e) => {
        e.stopPropagation(); // ✅ prevent drag
        onDelete();
      }}
      className="text-gray-500 hover:text-red-600"
    >
      <img src={deleteIcon} title="Delete" />
    </button>
        </div>
      </div>
    </div>
  );
};