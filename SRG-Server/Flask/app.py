from flask import Flask, request, jsonify
import requests
import os
from werkzeug.utils import secure_filename
from pymongo import MongoClient


app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB limit

# Load API key from environment variables
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL = os.getenv("ROBOFLOW_MODEL")
ROBOFLOW_VERSION = os.getenv("ROBOFLOW_VERSION")

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['SRG-DB']
collection = db['favorites']



# Create uploads folder
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

    try:
        # Send image to Roboflow
        with open(filepath, "rb") as image_file:
            response = requests.post(
                f"https://detect.roboflow.com/{ROBOFLOW_MODEL}/{ROBOFLOW_VERSION}?api_key={ROBOFLOW_API_KEY}",
                files={"file": image_file},
            )
        response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": "Failed to process image"}), 500

    return jsonify(response.json())

@app.route('/favorite', methods=['POST'])
def favorite_recipe():
    data = request.json
    # Insert the recipe data into MongoDB
    collection.insert_one(data)
    return jsonify({"message": "Recipe added to favorites!"}), 200

@app.route('/favorite/<recipe_name>', methods=['DELETE'])
def unfavorite_recipe(recipe_name):
    # Remove the recipe from favorites using the recipe name
    result = collection.delete_one({"name": recipe_name})
    if result.deleted_count == 1:
        return jsonify({"message": "Recipe removed from favorites!"}), 200
    else:
        return jsonify({"message": "Recipe not found in favorites!"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7002, debug=True)

