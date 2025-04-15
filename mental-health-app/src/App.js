import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
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

      console.log("API Response:", response.data);

      const sentiment = response.data.sentiment;
      const capitalized =
        sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
      setPrediction(capitalized);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred. Check API status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-blue-900 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🧠 Mental Health Sentiment Analyzer
      </motion.h1>

      <motion.textarea
        className="w-full max-w-lg p-4 rounded-md border border-blue-400 shadow-md focus:ring-2 focus:ring-blue-600 transition-all mb-4 text-lg"
        rows={4}
        placeholder="Type your thoughts here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.button
        className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-800 transition-transform transform hover:scale-105"
        onClick={handleSubmit}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "🔍 Analyzing..." : "🚀 Submit"}
      </motion.button>

      {prediction && (
        <motion.div
          className="mt-6 text-xl font-semibold p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: prediction.toLowerCase().includes("positive")
              ? "#D1FADF"
              : prediction.toLowerCase().includes("negative")
              ? "#FAD1D1"
              : "#FFF5D1",
            color: prediction.toLowerCase().includes("positive")
              ? "#065F46"
              : prediction.toLowerCase().includes("negative")
              ? "#7F1D1D"
              : "#92400E",
          }}
        >
          <span className="text-gray-700">Prediction: </span>
          <strong>{prediction}</strong>
        </motion.div>
      )}
    </div>
  );
}

export default App;
