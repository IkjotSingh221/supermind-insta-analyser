from fastapi import FastAPI, HTTPException, Query, Body
from pydantic import BaseModel
from typing import Optional, Dict
import requests
import json
import warnings
import os
from dotenv import load_dotenv
#cors
from fastapi.middleware.cors import CORSMiddleware

try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

load_dotenv()

# Configuration
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "2b278d29-6c82-476f-a40d-1bd38dda3693"
FLOW_ID = "6b942e00-f3ac-4a73-af3a-3834dd3e7cde"
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
ENDPOINT = ""  # You can set a specific endpoint name in the flow settings

TWEAKS = {
  "ChatInput-Mvfj0": {},
  "AstraDB-WmXFD": {},
  "ChatOutput-4GJjy": {},
  "Prompt-wcMxC": {},
  "ParseData-ExE58": {},
  "Google Generative AI Embeddings-hLLaH": {},
  "AstraDBChatMemory-kh85t": {},
  "TextInput-EPK6r": {},
  "StoreMessage-NNEnM": {},
  "Memory-adOSG": {},
  "GoogleGenerativeAIModel-pmDwz": {},
  "Prompt-UZ2ko": {},
  "GoogleGenerativeAIModel-Z3ucd": {}
}

# Initialize FastAPI app
app = FastAPI(title="LangFlow API", description="FastAPI Wrapper for LangFlow", version="1.0.0", docs_url="/")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for request and response validation
class FlowRequest(BaseModel):
    message: str
    endpoint: Optional[str] = FLOW_ID
    tweaks: Optional[Dict] = TWEAKS
    application_token: Optional[str] = APPLICATION_TOKEN
    output_type: Optional[str] = "chat"
    input_type: Optional[str] = "chat"


# Utility function to run the flow
def run_flow(
    message: str,
    endpoint: str = FLOW_ID,
    output_type: str = "chat",
    input_type: str = "chat",
    tweaks: Optional[Dict] = None,
    application_token: Optional[str] = None,
) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = None
    if tweaks:
        payload["tweaks"] = tweaks
    if application_token:
        headers = {"Authorization": "Bearer " + application_token, "Content-Type": "application/json"}
    
    response = requests.post(api_url, json=payload, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()


# Endpoint to run a LangFlow flow
@app.post("/chat")
async def run_flow_endpoint(request: FlowRequest):
    try:
        response = run_flow(
            message=request.message,
            endpoint=request.endpoint,
            output_type=request.output_type,
            input_type=request.input_type,
            tweaks=request.tweaks,
            application_token=request.application_token,
        )
        print(response)
        return response["outputs"][0]["outputs"][0]["results"]["message"]["text"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root Endpoint
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the LangFlow FastAPI Wrapper"}

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)