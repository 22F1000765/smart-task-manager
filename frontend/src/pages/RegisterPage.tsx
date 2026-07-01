import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";

import { Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    await register(
      username,
      email,
      password
    );

    alert("Registration Successful!");

    navigate("/login");
  } catch (error: any) {
    console.log(error.response);

    alert(
      error.response?.data?.detail ||
      "Registration Failed"
    );
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <br />

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

        <button type="submit">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;