import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

import { getTasks } from "../services/taskService";
import type { Task } from "../types/Task";

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
  return <h2>Loading tasks...</h2>;
}

  
return (
  <div style={{ padding: "40px" }}>
    <h2>Dashboard</h2>

    <button onClick={handleLogout}>
      Logout
    </button>

    <hr />

    <h3>My Tasks</h3>

    {tasks.length === 0 ? (
      <p>No tasks found.</p>
    ) : (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <br />
            Status: {task.status}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
export default DashboardPage;