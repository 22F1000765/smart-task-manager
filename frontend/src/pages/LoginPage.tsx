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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateLoginForm = () => {
  const newErrors = {
    email: "",
    password: "",
  };

  let isValid = true;

  if (!email.trim()) {
    newErrors.email = "Email is required.";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "Password is required.";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateLoginForm()) {
      return;
  }

    try {
      setIsSubmitting(true);
      const data = await loginUser(email.trim(), password);

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
      
    }  finally {
          setIsSubmitting(false);
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
            onChange={(e) => {
              setEmail(e.target.value);

              if (errors.email) {
                setErrors({
                  ...errors,
                  email: "",
                });
              }
}}
            
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            }`}

          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

                if (errors.password) {
                  setErrors({
                    ...errors,
                    password: "",
                  });
                }
}}
            
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
                {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
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