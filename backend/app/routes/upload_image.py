from keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
from flask import request, jsonify
from pathlib import Path
import os
from app.controllers.get_response_from_llm import getResponseFromLLM
from flask import Blueprint

upload_image_blueprint = Blueprint('upload_image', __name__)

# cnn model for image cecognition
loaded_model_cnn = load_model(
    Path(os.getcwd()+"/app/data/leaf_classifier_model.h5"))

# retrieving list of leaves classes
file_path = Path(os.getcwd()+"/app/data/my_list.txt")
retrieved_list = []
with open(file_path, "r") as file:
    for line in file:
        item = line.strip()
        retrieved_list.append(item)


@upload_image_blueprint.route('/upload', methods=['POST'])
def upload_image():

    # reciving image
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file.save('app/data/images/uploaded_image.jpg')

    # CNN model processing
    image_path = Path(os.getcwd()+"/app/data/images/uploaded_image.jpg")
    # image_path = 'uploaded_image.jpg'
    img = image.load_img(image_path, target_size=(128, 128))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    predictions = loaded_model_cnn.predict(img)

    predicted_class_index = np.argmax(predictions)
    predicted_class_name = retrieved_list[predicted_class_index]

    print(f"The predicted class is: {predicted_class_name}")

    # deleting image after processing
    os.remove(image_path)
    
    # llm processing
    questions = ["basic details of " + predicted_class_name, "disease cureable by " + predicted_class_name, predicted_class_name +
                 "used in which medicinal drugs and what is the procedure of making it.give me detail explaination along with its percentage composition"]
    return getResponseFromLLM(questions)
