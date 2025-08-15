import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: undefined }));
    try {
      await dispatch(login({ username: email, password })).unwrap();
      navigate("/tickets");
    } catch (err) {
      console.error("Login error:", err);
      setErrors((prev) => ({
        ...prev,
        general: "Login failed, please try again",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
          Support Ticket System
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Log in to raise and manage your tickets
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 w-full mb-2 rounded-md text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-2 rounded-md text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 w-full mb-2 rounded-md text-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <button
          type="submit"
          className={`bg-blue-600 text-white py-3 px-4 w-full rounded-lg font-semibold text-lg flex justify-center items-center transition-colors duration-300 hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="loader border-t-2 border-white rounded-full w-6 h-6 animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
