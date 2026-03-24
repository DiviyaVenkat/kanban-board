import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContent";
import type { Task, TaskStatus } from "../types/Task";

export const TaskModal = () => {
  const { selectedTask, updateTask, deleteTask, setSelectedTask } = useTasks();

  const [task, setTask] = useState<Task | null>(selectedTask);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTask(selectedTask);
    setIsEditing(false);
  }, [selectedTask]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-3">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left ">Task Name</label>
        <input
          disabled={!isEditing}
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="shadow-lg max-w-full w-full p-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg"
        />
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left ">Task Description</label>
        <textarea
          disabled={!isEditing}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="shadow-lg max-w-full w-full p-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg"
        />
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left ">Priority</label>
        <select
          disabled={!isEditing}
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
          className="shadow-lg max-w-full w-full p-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left ">Status</label>
        <select
          disabled={!isEditing}
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as TaskStatus })
          }
          className="shadow-lg max-w-full w-full p-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2 mt-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-rose-800 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                updateTask(task);
                setIsEditing(false);
              }}
              className="bg-rose-800 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          )}

          <button
            onClick={() => deleteTask(task.id)}
            className="bg-gray-900 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

          <button
            onClick={() => setSelectedTask(null)}
            className="ml-auto text-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};