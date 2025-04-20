import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

function SentimentAnalyzer() {
  const [userInput, setUserInput] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setPrediction("Please enter some text.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ml-miniproj.onrender.com/predict",
        { text: userInput },
        { headers: { "Content-Type": "application/json" } }
      );

      const sentiment = response.data.sentiment || response.data.prediction;
      setPrediction(sentiment.charAt(0).toUpperCase() + sentiment.slice(1));
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred. Check API status.");
    } finally {
      setLoading(false);
    }
  };

  // Emoji & background color logic
  const getEmoji = (label) => {
    const l = label.toLowerCase();
    if (l.includes("very happy")) return "😄";
    if (l.includes("happy")) return "😊";
    if (l.includes("very sad")) return "😭";
    if (l.includes("sad")) return "😔";
    if (l.includes("angry")) return "😡";
    if (l.includes("suicidal")) return "💀";
    return "😐";
  };

  const getBackgroundColor = (label) => {
    const l = label.toLowerCase();
    if (l.includes("very happy")) return "#d1f5d3"; // bright green
    if (l.includes("happy")) return "#e6f9e8"; // soft green
    if (l.includes("angry")) return "#fddede"; // soft red
    if (l.includes("very sad")) return "#cfd9ed"; // deep blue
    if (l.includes("sad")) return "#e5edfb"; // soft blue
    if (l.includes("suicidal")) return "#e0e0e0"; // dark gray
    return "#fff8dc"; // neutral beige
  };

  return (
    <div className="app-container">
      <motion.h1
        className="app-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🧠 Mental Health Sentiment Analyzer
      </motion.h1>

      <motion.textarea
        className="app-textarea"
        rows={4}
        placeholder="Type your thoughts here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.button
        className="app-button"
        onClick={handleSubmit}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "🔍 Analyzing..." : "🚀 Submit"}
      </motion.button>

      {prediction && (
        <motion.div
          className="app-prediction"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: getBackgroundColor(prediction),
            color: "#111",
            borderRadius: "1rem",
            padding: "1rem 1.5rem",
            marginTop: "1.5rem",
            fontSize: "1.25rem",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span className="emoji" style={{ fontSize: "1.8rem" }}>
            {getEmoji(prediction)}
          </span>
          <span>Prediction: </span>
          <strong>{prediction}</strong>
        </motion.div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;
