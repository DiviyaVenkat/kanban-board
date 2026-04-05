import React, { useState } from "react";
import { useTasks } from "../context/TaskContent";

export const TaskForm = () => {
  const { addTask } = useTasks();
  const [form, setForm] = useState({ name: "", description: "", status: "todo", priority: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedDesc = form.description.trim();

    if (!trimmedName || !trimmedDesc) {
      alert("Please enter valid task details");
      return;
    }

    if (!form.priority) {
      alert("Please select priority");
      return;
    }

    addTask({
      id: Date.now().toString(),
      priority: form.priority,
      name: trimmedName,
      description: trimmedDesc,
      status: form.status,
    } as any);

    // addTask({ id: Date.now().toString(), ...form } as any);
    setForm({ name: "", description: "", status: "todo", priority: "" });
  };



  return (
    <>
      <h2 className="text-rose-800 text-2xl font-bold p-4">Kanban Board</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6 flex flex-row flex-nowrap justify-start items-start gap-4">
        <div className="form-row flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">Task Name</label>
          <input className="shadow-lg max-w-full w-full p-2 m-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg" required id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Task Name" />
        </div>
        <div className="form-row flex-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-left">Description</label>
          <input className="shadow-lg max-w-full w-full p-2 m-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg" required id="description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Task Description" />
        </div>
        <div className="form-row flex-1">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left ">Priority</label>
          <select
            className="shadow-lg max-w-full w-full p-2 m-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg"
            required
            id="priority"
            name="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="" disabled>Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-row flex-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 text-left ">Status</label>
          <select className="shadow-lg max-w-full w-full p-2 m-2 text-base border border-gray-700 focus:border-pink-600 rounded-lg" required id="status" name="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit" className="add-btn bg-rose-800 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </form>
    </>
  );
};