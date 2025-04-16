// // HomePage.jsx
import "./HomePage.css";
// import React from "react";
// import { motion } from "framer-motion";

// const HomePage = ({ onStart }) => {
//   return (
//     <div className="home-container">
//       <motion.h1
//         className="home-title"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         🧠 Mental Health Sentiment Analyzer
//       </motion.h1>

//       <motion.p
//         className="home-description"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.8 }}
//       >
//         Discover the emotional tone behind your thoughts. Our AI model helps
//         analyze your mental state based on what you type. No judgment, just
//         support. ✨
//       </motion.p>

//       <motion.button
//         onClick={onStart}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="home-button"
//       >
//         🔐 Login
//       </motion.button>

//       <motion.div
//         className="home-footer"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       >
//         Built with ❤️ using AI & React
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to LoginPage when the button is clicked
  };

  return (
    <div className="home-container">
      <motion.h1
        className="home-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🧠 Mental Health Sentiment Analyzer
      </motion.h1>

      <motion.p
        className="home-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Discover the emotional tone behind your thoughts. Our AI model helps
        analyze your mental state based on what you type. No judgment, just
        support. ✨
      </motion.p>

      <motion.button
        onClick={handleLoginClick} // When clicked, navigate to LoginPage
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="home-button"
      >
        🔐 Login
      </motion.button>

      <motion.div
        className="home-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Built with ❤️ using AI & React
      </motion.div>
    </div>
  );
};

export default HomePage;
