import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      <p>Welcome to Smart Task Manager!</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;