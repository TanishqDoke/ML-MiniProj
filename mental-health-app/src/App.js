import { useState } from "react";
import axios from "axios";

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
        {
          text: userInput,
        }
      );

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">
        Mental Health Sentiment Analyzer
      </h1>

      <textarea
        className="w-full max-w-xl p-4 rounded-md border border-blue-300 shadow-md mb-4"
        rows={4}
        placeholder="Enter your thoughts..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {prediction && (
        <div className="mt-6 text-xl font-semibold">
          Prediction:{" "}
          <span
            className={
              prediction.toLowerCase().includes("positive")
                ? "text-green-600"
                : prediction.toLowerCase().includes("negative")
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {prediction}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
