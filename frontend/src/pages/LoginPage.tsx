import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      login(data.access_token);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
        console.log(error.response);
        console.log(error.response?.data);
        console.log(error.response?.status);

        alert(JSON.stringify(error.response?.data));
      
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Smart Task Manager</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;