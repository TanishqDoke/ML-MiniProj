import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ExpertDashboard.css";
// Add at the top with other imports
import { FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Sample Data
const candidates = [
  {
    id: 1,
    name: "Tanishq Doke",
    posts: [
      { text: "I'm feeling really low today.", sentiment: "Very Sad" },
      { text: "Trying to stay positive.", sentiment: "Neutral" },
      { text: "Nothing makes sense anymore...", sentiment: "Suicidal" },
    ],
  },
  {
    id: 2,
    name: "Riya Shah",
    posts: [
      { text: "Had a great day with friends!", sentiment: "Happy" },
      { text: "Missing home.", sentiment: "Sad" },
    ],
  },
];

// Sentiment Weights
const sentimentWeights = {
  Happy: 100,
  Neutral: 70,
  Sad: 40,
  "Very Sad": 20,
  Suicidal: 0,
};

export default function ExpertDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSentimentStats = (posts) => {
    const counts = {};
    posts.forEach((post) => {
      counts[post.sentiment] = (counts[post.sentiment] || 0) + 1;
    });

    const total = posts.length;
    const percentages = {};
    let scoreSum = 0;

    for (let sentiment in counts) {
      percentages[sentiment] = ((counts[sentiment] / total) * 100).toFixed(1);
      scoreSum += (sentimentWeights[sentiment] || 0) * counts[sentiment];
    }

    const avgScore = Math.round(scoreSum / total);
    return { percentages, avgScore };
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className="toggle-sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        {sidebarOpen && (
          <>
            <h2>
              <FaUsers style={{ marginRight: "8px" }} /> Users
            </h2>
            <ul>
              {candidates.map((user) => (
                <li
                  key={user.id}
                  className={`user-item ${
                    selectedUser?.id === user.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="main-content">
        {selectedUser ? (
          <>
            <motion.h1
              className="user-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {selectedUser.name}'s Profile
            </motion.h1>
            <div className="profile-layout">
              <div className="posts-section">
                <h3>Posts</h3>
                {selectedUser.posts.map((post, index) => (
                  <div className="post-item" key={index}>
                    <p className="post-text">{post.text}</p>
                    <span
                      className={`post-sentiment ${post.sentiment
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {post.sentiment}
                    </span>
                  </div>
                ))}
              </div>

              <div className="stats-section">
                <div className="score-card">
                  <h4>Mental Health Score</h4>
                  <p className="score-value">
                    {getSentimentStats(selectedUser.posts).avgScore} / 100
                  </p>
                </div>
                <div className="sentiment-card">
                  <h4>Sentiment Breakdown</h4>
                  <ul className="sentiment-list">
                    {Object.entries(
                      getSentimentStats(selectedUser.posts).percentages
                    ).map(([sentiment, percentage]) => (
                      <li key={sentiment}>
                        <strong>{sentiment}</strong>: {percentage}%
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>Select a user to view their profile and sentiment analysis.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
