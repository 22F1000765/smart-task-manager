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

  const [errors, setErrors] = useState({
  username: "",
  email: "",
  password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRegisterForm = () => {
  const newErrors = {
    username: "",
    email: "",
    password: "",
  };

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username.trim()) {
    newErrors.username = "Username is required.";
    isValid = false;
  }

  if (!email.trim()) {
    newErrors.email = "Email is required.";
    isValid = false;
  } else if (!emailRegex.test(email.trim())) {
    newErrors.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "Password is required.";
    isValid = false;
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters.";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};
  const handleRegister = async (
  e: React.FormEvent
) => {
  e.preventDefault();
  if (isSubmitting) return;
  if (!validateRegisterForm()) {
    return;
  }

  try {
    setIsSubmitting(true);
    await register(
      username.trim(),
      email.trim(),
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
  } finally {
  setIsSubmitting(false);
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
            onChange={(e) => {
              setUsername(e.target.value);

              if (errors.username) {
                setErrors({
                  ...errors,
                  username: "",
                });
              }
}}
            
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.username
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
          />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username}
              </p>
            )}
        </div>

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
              errors.email
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
          {isSubmitting ? "Registering..." : "Register"}
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