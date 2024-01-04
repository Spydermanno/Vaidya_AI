from langchain.vectorstores.weaviate import Weaviate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI

import requests
import json
import os
from pathlib import Path
import weaviate
from dotenv import load_dotenv

# load env variables
dot_env_path = Path(os.getcwd()+"/.env")
load_dotenv(dotenv_path=dot_env_path)


headers = {"Authorization": f"Bearer {os.environ['HUGGINGFACE_API_TOKEN']}"}


def query(payload):
    data = json.dumps(payload)
    response = requests.request(
        "POST", os.environ["HUGGINGFACE_API_URL"], headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))

client = weaviate.Client(
    url=os.environ["DB_URL"],
    additional_headers={
        "X-HuggingFace-Api-Key": os.environ["HUGGINGFACE_API_TOKEN"]
    }
)


def get_inbox_conversation_chain(vectorstore):
    momory = ConversationBufferMemory(
        memory_key="chat_history", return_messages=True, verbose=True, input_key="question", output_key="answer")
    # llm = HuggingFaceHub(repo_id=repo_id, model_kwargs={"temperature": 0.7, "max_length": 10000})
    llm = OpenAI(temperature=0.8, max_tokens=1000)

    system_template = """Use following pieces of context to answer the users question. 
    Following contexts are summarised texts from users inbox. If you don't find the answer, ask again with more details.
    ----------------
    {context}"""

    # Create the chat prompt templates
    messages = [
        SystemMessagePromptTemplate.from_template(system_template),
        HumanMessagePromptTemplate.from_template("{question}")
    ]

    qa_prompt = ChatPromptTemplate.from_messages(messages)
    retriver = vectorstore.as_retriever(search_kwargs={"k": 10})

    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriver,
        return_source_documents=True,
        combine_docs_chain_kwargs={"prompt": qa_prompt},
        max_tokens_limit=500,
        memory=momory,
        verbose=True
    )
    return conversation_chain


vectorstore = Weaviate(client, "Ayurveda_Books", "pdfChunks")
conversation = get_inbox_conversation_chain(vectorstore)


def question_answering(question):
    response = conversation({"question": question})
    return response
