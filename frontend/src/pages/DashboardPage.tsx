import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/Task";

import { LogOut,Pencil,Trash2,Plus,Search } from "lucide-react"

import { toast } from "sonner";


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

  const [errors, setErrors] = useState({
    title: "",
  });

  

  const fetchTasks = async () => {
  try {
    const data = await getTasks();
    setTasks(data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load tasks");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const validateTaskForm = () => {
  const newErrors = {
    title: "",
  };

  let isValid = true;

  if (!title.trim()) {
    newErrors.title = "Task title is required.";
    isValid = false;
  } else if (title.trim().length > 100) {
    newErrors.title = "Title must be less than 100 characters.";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

const handleCreateTask = async (
  e: React.FormEvent
) => {
  e.preventDefault();
  if (!validateTaskForm()) {
    return;
  }

  try {
    const isEditing = editingTaskId !== null;
    if (editingTaskId) {
  await updateTask(
    editingTaskId,
    title.trim(),
    description,
    status
  );
} else {
  await createTask(
    title.trim(),
    description
  );
}

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setEditingTaskId(null);

    fetchTasks();
    toast.success(
  isEditing
    ? "Task updated successfully."
    : "Task created successfully."
);

  } catch (error) {
    console.error(error);
    toast.error(
      editingTaskId
      ? "Failed to update task."
      : "Failed to create task."
    );
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
    toast.success("Task deleted successfully.");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete task");
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
   return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white px-8 py-6 shadow-md">
        <div className="rounded-xl bg-white px-8 py-6 shadow-md">
          <h2 className="text-xl font-semibold text-slate-700 text-center">
            Loading your dashboard...
          </h2>

        <div className="mt-4 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
</div>
      </div>
    </div>
  );
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
  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
>
  <LogOut size={18} />
  Logout
</button>
  
</div>
</div>

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
    
    onChange={(e) => {
      setTitle(e.target.value);

    if (errors.title) {
      setErrors({
        ...errors,
        title: "",
      });
    }
    
}}
    
    className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
  errors.title
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
}`}
  />
  {errors.title && (
  <p className="mt-1 text-sm text-red-600">
    {errors.title}
  </p>
)}
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
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
>
  <Plus size={18} />
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

<div className="mb-8">
  <div className="mb-2 flex items-center gap-2">
  <Search size={18} className="text-slate-600" />
  <label className="text-sm font-medium text-slate-700">
    Search Tasks
  </label>
</div>

  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<h2 className="mb-6 text-2xl font-semibold text-slate-800">
  My Tasks
</h2>


    {filteredTasks.length === 0 ? (
  <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
    <h3 className="text-lg font-semibold text-slate-700">
      No tasks found
    </h3>

    <p className="mt-2 text-slate-500">
      Create a new task to get started.
    </p>
  </div>
) : (
    <div className="grid gap-5 md:grid-cols-2">
        {filteredTasks.map((task) => (
          <div
  key={task.id}
  className="rounded-xl bg-white p-6 shadow-md"
>
            <h3 className="text-xl font-semibold text-slate-800">
              {task.title}
            </h3>
           <p className="mt-2 text-slate-600">
              {task.description || "No description provided."}
            </p>
            
            <div className="mt-4">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
                }`}
              >
              {task.status}
            </span>
            </div>

            

        <div className="mt-6 flex justify-end gap-3">
  <button
    type="button"
    onClick={() => {
      setEditingTaskId(task.id);
      setTitle(task.title);
      setDescription(task.description ?? "");
      setStatus(task.status);
    }}
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
  >
    <Pencil size={16} />
    Edit
  </button>

  <button
    type="button"
    onClick={() => handleDeleteTask(task.id)}
    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
  >
    < Trash2 size={16} />
    Delete
  </button>
</div>    
  
        </div>
        ))}
      </div>
    )}
  </div>
  </div>

);
}
export default DashboardPage;