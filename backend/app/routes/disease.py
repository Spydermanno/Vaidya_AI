from flask import request, jsonify, make_response
from app.controllers.get_response_from_llm import getResponseFromLLM
from flask import Blueprint

disease_blueprint = Blueprint('disease', __name__)


@disease_blueprint.route('/disease', methods=['POST'])
def disease():
    try:
        disease = request.json['disease']
        query = ["Medicinal drugs that can cure " + disease,
                "Formulations that can cure " + disease, "What are its consumptional precautions?"]
        return getResponseFromLLM(query)
    except Exception as e:
        return make_response(jsonify({'message': 'error no disease', 'error': str(e)}), 500)
