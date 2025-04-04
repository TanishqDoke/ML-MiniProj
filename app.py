from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:3000", "https://ml-miniproj.onrender.com"]}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get("text", "")

    # Mock prediction (replace with actual ML model inference)
    prediction = "Positive" if "happy" in text.lower() else "Negative"

    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
