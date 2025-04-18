# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib

# # Load model and vectorizer
# model = joblib.load("sentiment_model.pkl")
# vectorizer = joblib.load("vectorizer.pkl")

# # Initialize Flask app
# app = Flask(__name__)

# # ✅ Add your deployed frontend URL
# CORS(app, origins=[
#     "http://localhost:3000",  # local testing
#     "https://mental-health-analyzer-bfh2.onrender.com"  # deployed frontend
# ])

# @app.route("/")
# def home():
#     return "Mental Health Sentiment Analysis API is running!"

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     text = data.get("text", "")

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     text_vectorized = vectorizer.transform([text])
#     prediction = model.predict(text_vectorized)[0]

#     return jsonify({"sentiment": prediction})

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

# Get GROQ_API_KEY directly from environment variable (Render handles this)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Flask setup
app = Flask(__name__)

# CORS for local and deployed frontend
CORS(app, origins=[
    "http://localhost:3000",
    "https://mental-health-analyzer-bfh2.onrender.com"
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

    try:
        # Call Groq API for classification
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama3-8b-8192",
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are a mental health assistant. "
                            "Classify the sentiment of the following text as one of: "
                            "happy, neutral, sad, very sad, or suicidal. "
                            "Respond ONLY with the label."
                        )
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ]
            }
        )

        groq_data = response.json()

        # Extract sentiment from Groq's response
        sentiment = groq_data["choices"][0]["message"]["content"].strip()

        return jsonify({"sentiment": sentiment})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
