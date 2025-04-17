from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Add this
import joblib

# Load model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Initialize Flask app
app = Flask(__name__)

# ✅ Enable CORS
CORS(app, origins=["http://localhost:3000", "https://ml-miniproj.onrender.com"])

@app.route("/")
def home():
    return "Mental Health Sentiment Analysis API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)

        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        text_vectorized = vectorizer.transform([text])
        prediction = model.predict(text_vectorized)[0]

        return jsonify({"sentiment": prediction})
    
    except Exception as e:
        print("❌ Error in prediction:", e)
        return jsonify({"error": "Internal server error"}), 500
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets this automatically
    app.run(host="0.0.0.0", port=port)
