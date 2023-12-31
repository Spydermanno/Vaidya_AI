from flask import Flask
from flask_cors import CORS
from app.routes.disease import disease_blueprint
from app.routes.upload_image import upload_image_blueprint
import os


PRODUCTION_URL = os.environ.get("PRODUCTION_URL")
if not PRODUCTION_URL:
    PRODUCTION_URL = "http://localhost:3000"

app = Flask(__name__)
CORS(app, resources={
     r"/*": {"origins": "*"}}, allow_headers="Content-Type")

app.register_blueprint(upload_image_blueprint)
app.register_blueprint(disease_blueprint)


if __name__ == '__main__':
    app.run(debug=os.environ["DEBUG"], host='0.0.0.0', port=5000)
