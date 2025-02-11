from flask import Flask, request, jsonify
import requests
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Load API key from environment variables
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL = os.getenv("ROBOFLOW_MODEL")
ROBOFLOW_VERSION = os.getenv("ROBOFLOW_VERSION")

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create uploads folder if not exists

@app.route("/")
def home():
    return "Roboflow Flask Server is Running!"

@app.route("/detect", methods=["POST"])
def detect_objects():
    if "file" not in request.files:  # Ensure this matches the React Native key
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]  # Fix to match the correct key
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Send image to Roboflow
    with open(filepath, "rb") as image_file:
        response = requests.post(
            f"https://detect.roboflow.com/{ROBOFLOW_MODEL}/{ROBOFLOW_VERSION}?api_key={ROBOFLOW_API_KEY}",
            files={"file": image_file},
        )

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7002, debug=True)

