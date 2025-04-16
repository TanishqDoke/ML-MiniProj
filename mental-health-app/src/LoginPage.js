import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSkipLogin = () => {
    navigate("/analyze"); // Redirect to sentiment analyzer page
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-form-container"
      >
        <h2 className="login-header">🧠 Mental Health Sentiment Analyzer</h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-semibold mb-1"
            >
              Login As
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 transition"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="login-button mt-6"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Just testing?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={handleSkipLogin}
          >
            Skip Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
