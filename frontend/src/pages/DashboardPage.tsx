import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/Task";

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [status, setStatus] = useState("Pending");

  const [searchTerm, setSearchTerm] = useState("");

  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
  try {
    const data = await getTasks();
    setTasks(data);
  } catch (error) {
    console.error(error);
    setMessage("Failed to load tasks");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);
const handleCreateTask = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const isEditing = editingTaskId !== null;
    if (editingTaskId) {
  await updateTask(
    editingTaskId,
    title,
    description,
    status
  );
} else {
  await createTask(
    title,
    description
  );
}

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setEditingTaskId(null);

    fetchTasks();
    setMessage(
  isEditing
    ? "✅ Task updated successfully."
    : "✅ Task created successfully."
);

  } catch (error) {
    console.error(error);
    setMessage("Failed to create task");
  }
};
const handleDeleteTask = async (taskId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  try {
    await deleteTask(taskId);

    fetchTasks();
    setMessage("✅ Task deleted successfully.");
  } catch (error) {
    console.error(error);
    setMessage("Failed to delete task");
  }
};

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  if (loading) {
  return <h2>Loading tasks...</h2>;
}

  
return (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-5xl px-6 py-8">
    <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Smart Task Manager
    </h1>

    <p className="mt-1 text-slate-500">
      Manage your tasks efficiently
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-500 px-5 py-2 text-white font-medium transition hover:bg-red-600"
  >
    Logout
  </button>
</div>
</div>


{message && (
  <div className="mb-6 rounded-lg bg-green-100 border border-green-300 p-3 text-green-700">
    {message}
  </div>
)}
    <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
  <h2 className="mb-6 text-2xl font-semibold text-slate-800">
    {editingTaskId ? "Edit Task" : "Create Task"}
  </h2>

  <form onSubmit={handleCreateTask} className="space-y-5">
  <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Title
  </label>

  <input
    type="text"
    placeholder="Enter task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  

  <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Description
  </label>

  <textarea
    placeholder="Enter task description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  

<div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Status
  </label>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="Pending">Pending</option>
    <option value="In progress">In progress</option>
    <option value="Completed">Completed</option>
  </select>
</div>

  

  <button
  type="submit"
  className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
>
  {editingTaskId ? "Update Task" : "Create Task"}
</button>

  

  {editingTaskId && (
  <button
  type="button"
  onClick={() => {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setStatus("Pending");
  }}
  className="ml-3 rounded-lg border border-slate-300 px-6 py-2.5 text-slate-700 transition hover:bg-slate-100"
>
  Cancel
</button>
)}
</form>

<hr />
    <div>
  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

<br />
    <h3>My Tasks</h3>


    {tasks.length === 0 ? (
      <p>No tasks found.</p>
    ) : (
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <br />
            Status: {task.status}
            <br />
            <br />

            <button
  type="button"
  onClick={() => {
    console.log("Edit clicked");
    console.log(task);

    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description ?? "");
    setStatus(task.status);
  }}
>
  Edit
</button>

<button
  type="button"
  onClick={() => handleDeleteTask(task.id)}
>
  Delete
</button>
        </li>
        ))}
      </ul>
    )}
  </div>
  </div>

);
}
export default DashboardPage;