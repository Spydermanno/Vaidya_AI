from app.packages import llm_model
import time
from flask import jsonify


def getResponseFromLLM(questions):
    response_data = {}
    for i in range(len(questions)):
        retry_count = 0
        max_retries = 5  # You can adjust this based on your needs

        while retry_count < max_retries:
            try:
                response = llm_model.question_answering(questions[i])
                response_data["response" + str(i + 1)] = response['answer']
                break 
            except Exception as e:
                if "429" in str(e):  # Check if the error is a rate limit error
                    retry_count += 1
                    print(
                        f"Rate limit exceeded. Retrying in 20 seconds (attempt {retry_count}/{max_retries})")
                    time.sleep(20)
                else:
                    print(f"An error occurred: {e}")
                    break
    return jsonify(response_data)
