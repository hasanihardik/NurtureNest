from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
import numpy as np
import os

app = Flask(__name__)

# Create static directory if it doesn't exist
static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

# Check if model file exists
model_path = "model.keras"
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

    try:
        img_path = os.path.join(static_dir, img.filename)
        img.save(img_path)

        predictions = predict_label(img_path)
        if predictions is None:
            return jsonify({"error": "Error processing image"}), 500

        probabilities = predictions[0].tolist()
        predicted_class = d[1] if probabilities[1] > 0.5 else d[0]

        return jsonify({
            "prediction": predicted_class,
            "probabilities": probabilities,
            "img_path": img_path
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/submit", methods=['GET', 'POST'])
def get_output():
    if request.method != 'POST':
        return jsonify({"error": "Method not allowed"}), 405

    if 'img' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img = request.files['img']
    if not img.filename:
        return jsonify({"error": "No selected file"}), 400

    try:
        img_path = os.path.join(static_dir, img.filename)
        img.save(img_path)

        predictions = predict_label(img_path)
        if predictions is None:
            return jsonify({"error": "Error processing image"}), 500

        predicted_class = d[1] if predictions[0][1] > 0.5 else d[0]
        return jsonify({"predicted_class": predicted_class})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
