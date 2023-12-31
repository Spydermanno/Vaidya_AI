from flask import request
from app.controllers.get_response_from_llm import getResponseFromLLM
from flask import Blueprint

disease_blueprint = Blueprint('disease', __name__)


@disease_blueprint.route('/disease', methods=['POST'])
def disease():
    disease = request.json['disease']
    query = ["Medicinal drugs that can cure " + disease,
             "Formulations that can cure " + disease, "What are its consumptional precautions?"]
    return getResponseFromLLM(query)
