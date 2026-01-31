# Backend/routes/ai_query.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# from Backend.services.openai_service import OpenAIService
from services.openai_service import OpenAIService
import logging

# -------------------------------
# Set up logging to console
# -------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the router without a prefix; main.py adds "/api/ai"
router = APIRouter(tags=["AI"])

# Initialize the OpenAI service
openai_service = OpenAIService()

# Request model
class AskRequest(BaseModel):
    question: str

# Route to handle AI queries
@router.post("/ask")
async def ask_question(request: AskRequest):
    """
    Endpoint to ask AI a question.
    Expects JSON: {"question": "Your question here"}
    Returns JSON: {"success": True, "answer": "..."}
    """
    try:
        answer = await openai_service.answer_query(request.question)
        return {"success": True, "answer": answer}

    except Exception as e:
        # 🔧 FIXED INDENTATION
        logger.exception("OpenAI query failed")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
