import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";

import { Link } from "react-router-dom";
import { toast } from "sonner";

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

    
    toast.success("✅ Registration successful!");

    navigate("/login");
  } catch (error: any) {
    console.log(error.response);

    toast.error(
  error.response?.data?.detail ||
  "Registration failed."
);
  }
};

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-slate-800">
        Create Account
      </h1>
      
      <p className="mt-2 text-center text-slate-500">
        Register to start managing your tasks
      </p>

      <form onSubmit={handleRegister} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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
          Register
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
);
}

export default RegisterPage;