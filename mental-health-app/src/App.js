import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import SentimentAnalyzer from "./SentimentAnalyzer";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ExpertDashboard from "./ExpertDashboard"; // ✅ This is the missing line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/analyze" element={<SentimentAnalyzer />} />
        <Route path="/edash" element={<ExpertDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
