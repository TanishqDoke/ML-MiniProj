import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage"; // Import the HomePage component
import SentimentAnalyzer from "./SentimentAnalyzer";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page as default */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        <Route path="/analyze" element={<SentimentAnalyzer />} />{" "}
        {/* Sentiment Analyzer page */}
      </Routes>
    </Router>
  );
}

export default App;
