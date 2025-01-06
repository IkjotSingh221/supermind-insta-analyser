import os
from dotenv import load_dotenv
import json
import requests
from typing import Optional
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import warnings

try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

# Load environment variables
load_dotenv()

# FastAPI app instance
app = FastAPI()

# Constants
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "8958d971-851b-41ce-945e-4aad6bd195e6"
FLOW_ID = "45fc3207-971a-4332-bb2f-106f629d87fe"
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")

# Default tweaks dictionary
TWEAKS = {
    "ChatInput-sc1Iq": {},
    "ChatOutput-3p84t": {},
    "Agent-4NFeL": {},
    "Prompt-hOVm7": {},
    "AstraDB-vQnJk": {},
    "ParseData-XLpZq": {},
    "Google Generative AI Embeddings-1ZEge": {}
}

# Request model for chatbot inputs
class ChatbotRequest(BaseModel):
    message: str
    endpoint: str = FLOW_ID
    output_type: str = "chat"
    input_type: str = "chat"
    tweaks: Optional[dict] = TWEAKS

# Helper function to run the flow
def run_flow(message: str,
             endpoint: str,
             output_type: str = "chat",
             input_type: str = "chat",
             tweaks: Optional[dict] = None,
             application_token: Optional[str] = None) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    if tweaks:
        payload["tweaks"] = tweaks
    headers = {"Authorization": f"Bearer {application_token}", "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()

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
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)