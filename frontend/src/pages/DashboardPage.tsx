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
  <div style={{ padding: "40px" }}>
    <h2>Dashboard</h2>
    {message && (
  <p>{message}</p>
)}

    <button onClick={handleLogout}>
      Logout
    </button>

    <hr />
    <h3>
      {editingTaskId ? "Edit Task" : "Create Task"}
    </h3>
    

<form onSubmit={handleCreateTask}>
  <div>
    <input
      type="text"
      placeholder="Task Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
  </div>

  <br />

  <div>
    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>

  <br />

<div>
  <label>Status</label>
  <br />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="Pending">Pending</option>
    <option value="In progress">In progress</option>
    <option value="Completed">Completed</option>
  </select>
</div>

  <br />

  <button type="submit">
    {editingTaskId ? "Update Task" : "Create Task"}
  </button>

  <br />

  {editingTaskId && (
  <button
    type="button"
    onClick={() => {
      setEditingTaskId(null);
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }}
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
);
}
export default DashboardPage;