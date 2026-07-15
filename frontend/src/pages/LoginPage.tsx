import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../services/authService";

import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";
import { toast } from "sonner";

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

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error: any) {
        console.log(error.response);
        console.log(error.response?.data);
        console.log(error.response?.status);

        toast.error(
  error.response?.data?.detail || "Login failed."
);
      
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-slate-800">
        Smart Task Manager
      </h1>

      <p className="mt-2 text-center text-slate-500">
        Sign in to manage your tasks
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default LoginPage;