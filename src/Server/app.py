import os
import json
import requests
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    from langflow.load import upload_file
except ImportError:
    upload_file = None

# FastAPI app instance
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "8958d971-851b-41ce-945e-4aad6bd195e6"  # Replace with the new Langflow ID if applicable
FLOW_ID = "91d0167d-0f3e-454f-adb8-5a1359034987"  # Replace with the new Flow ID
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
ENDPOINT = ""  # Replace with the new endpoint name if set

# Default tweaks dictionary for the new workflow
TWEAKS = {
  "ChatInput-ddPlI": {},
  "ChatOutput-nXTZZ": {},
  "ParseData-uxutG": {},
  "AstraDB-ATQng": {},
  "Google Generative AI Embeddings-MIHqR": {},
  "GoogleGenerativeAIModel-EyrrG": {},
  "Prompt-TQBt4": {},
  "StoreMessage-ArGC0": {},
  "Memory-gjP4B": {},
  "AstraDBChatMemory-eZZ3L": {},
  "TextInput-qQoDx": {}
}

# Helper function to run the flow
def run_flow(
    message: str,
    endpoint: str,
    output_type: str = "chat",
    input_type: str = "chat",
    tweaks: Optional[dict] = None,
    application_token: Optional[str] = None
) -> dict:
    """
    Run a flow with a given message and optional tweaks.

    :param message: The message to send to the flow
    :param endpoint: The ID or the endpoint name of the flow
    :param tweaks: Optional tweaks to customize the flow
    :return: The JSON response from the flow
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    if tweaks:
        payload["tweaks"] = tweaks
    headers = {
        "Authorization": f"Bearer {application_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(api_url, json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()

# Request model for chatbot inputs
class ChatbotRequest(BaseModel):
    message: str
    endpoint: str = ENDPOINT or FLOW_ID
    output_type: str = "chat"
    input_type: str = "chat"
    tweaks: Optional[dict] = TWEAKS

# FastAPI endpoint
@app.post("/chat")
def chatbot_endpoint(request: ChatbotRequest):
    """
    Chatbot endpoint that processes user messages and interacts with the Langflow API.

    :param request: ChatbotRequest object containing user inputs
    :return: JSON response from the Langflow API
    """
    try:
        response = run_flow(
            message=request.message,
            endpoint=request.endpoint,
            output_type=request.output_type,
            input_type=request.input_type,
            tweaks=request.tweaks,
            application_token=APPLICATION_TOKEN
        )
        return response["outputs"][0]["outputs"][0]["results"]["message"]["text"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

