from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Load model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Initialize Flask app
app = Flask(__name__)

# Enable CORS — allow all for now, or restrict to your frontend domain
CORS(app, origins="*")  
# Optional: for stricter access, use below
# CORS(app, origins=["https://mental-health-frontend.onrender.com"])

@app.route("/")
def home():
    return "✅ Mental Health Sentiment Analysis API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Transform input text
    text_vectorized = vectorizer.transform([text])

    # Predict sentiment
    prediction = model.predict(text_vectorized)[0]

    return jsonify({"sentiment": prediction})

# Only used when running locally
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)
