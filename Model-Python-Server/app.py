from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
import numpy as np
import os
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Create static directory if it doesn't exist
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

# Correct the model path
model_path = os.getenv("MODEL_PATH", "model.keras")  # Use an environment variable for the model path
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

try:
    # Load the trained model
    model = load_model(model_path)
except Exception as e:
    raise Exception(f"Error loading model: {str(e)}")

# Mapping predictions to labels
d = {0: 'Abnormal', 1: 'Normal'}

def predict_label(img_path):
    try:
        i = image.load_img(img_path, target_size=(224, 224))
        i = image.img_to_array(i)
        i = np.expand_dims(i, axis=0)
        i = preprocess_input(i)
        predictions = model.predict(i)
        return predictions
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None

def save_and_predict(img):
    try:
        # Sanitize and generate a unique filename
        filename = secure_filename(img.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        img_path = os.path.join(static_dir, unique_filename)
        img.save(img_path)

        predictions = predict_label(img_path)
        if predictions is None:
            return None, "Error processing image"

        probabilities = predictions[0].tolist()
        predicted_class = d[1] if probabilities[1] > 0.5 else d[0]

        return {
            "prediction": predicted_class,
            "probabilities": probabilities,
            "img_path": img_path
        }, None
    except Exception as e:
        return None, str(e)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'img' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img = request.files['img']
    if not img.filename:
        return jsonify({"error": "No selected file"}), 400

    result, error = save_and_predict(img)
    if error:
        return jsonify({"error": error}), 500

    return jsonify(result)

@app.route("/submit", methods=['POST'])
def get_output():
    if 'img' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img = request.files['img']
    if not img.filename:
        return jsonify({"error": "No selected file"}), 400

    result, error = save_and_predict(img)
    if error:
        return jsonify({"error": error}), 500

    return jsonify({"predicted_class": result["prediction"]})

if __name__ == '__main__':
    print("Starting Flask application...")  # Debugging log
    app.run(debug=False)  # Ensure Flask app runs correctly
