# from flask import Flask, request, jsonify
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/predict": {"origins": ["http://localhost:3000", "https://ml-miniproj.onrender.com"]}})

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     text = data.get("text", "")

#     # Mock prediction (replace with actual ML model inference)
#     prediction = "Positive" if "happy" in text.lower() else "Negative"

#     return jsonify({"prediction": prediction})

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
import joblib

# Load model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Initialize Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return "Mental Health Sentiment Analysis API is running!"

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

if __name__ == "__main__":
    app.run(debug=True)