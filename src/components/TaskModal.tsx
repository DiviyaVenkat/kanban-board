import { useEffect, useRef, useState } from "react";
import { useTasks } from "../context/TaskContent";
import type { Task, TaskStatus } from "../types/Task";

export const TaskModal = () => {
  const { selectedTask, updateTask, deleteTask, setSelectedTask } = useTasks();

  const [task, setTask] = useState<Task | null>(selectedTask);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTask(selectedTask);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [selectedTask]);

  if (!task) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center" style={{zIndex: 9}}
      onClick={() => setSelectedTask(null)}
    >
      <div
        className="bg-white p-6 rounded-xl w-96 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      > <label className="block text-sm font-medium text-gray-700 text-left">Name</label>
        <input
          ref={inputRef}
          disabled={!isEditing}
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="border p-2"
        />
        <label className="block text-sm font-medium text-gray-700 text-left">Description</label>
        <textarea
          disabled={!isEditing}
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
          className="border p-2"
        />
        <label className="block text-sm font-medium text-gray-700 text-left">Priority</label>
        <select
          disabled={!isEditing}
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
          className="border p-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label className="block text-sm font-medium text-gray-700 text-left">Status</label>
        <select
          disabled={!isEditing}
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as TaskStatus })
          }
          className="border p-2"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2 mt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                updateTask(task);
                setIsEditing(false);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          )}

          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

          <button
            onClick={() => setSelectedTask(null)}
            className="ml-auto bg-gray-800 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};