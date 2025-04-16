// SentimentAnalyzer.js
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

      const sentiment = response.data.sentiment;
      setPrediction(sentiment.charAt(0).toUpperCase() + sentiment.slice(1));
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred. Check API status.");
    } finally {
      setLoading(false);
    }
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
          className={`app-prediction ${
            prediction.toLowerCase().includes("positive")
              ? "positive"
              : prediction.toLowerCase().includes("negative")
              ? "negative"
              : "neutral"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="emoji">
            {prediction.toLowerCase().includes("positive")
              ? "😊"
              : prediction.toLowerCase().includes("negative")
              ? "😔"
              : "😐"}
          </span>
          <span>Prediction: </span>
          <strong>{prediction}</strong>
        </motion.div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;
