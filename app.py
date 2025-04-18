from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Load model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Initialize Flask app
app = Flask(__name__)

# ✅ Add your deployed frontend URL
CORS(app, origins=[
    "http://localhost:3000",  # local testing
    "https://mental-health-analyzer-bfh2.onrender.com"  # deployed frontend
])

@app.route("/")
def home():
    return "Mental Health Sentiment Analysis API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    text_vectorized = vectorizer.transform([text])
    prediction = model.predict(text_vectorized)[0]

    return jsonify({"sentiment": prediction})

if __name__ == "__main__":
    app.run(debug=True)
