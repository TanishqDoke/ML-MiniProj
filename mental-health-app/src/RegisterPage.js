import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="register-form-container"
      >
        <h2 className="register-header">🔐 Create Your Account</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="register-button mt-6"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
