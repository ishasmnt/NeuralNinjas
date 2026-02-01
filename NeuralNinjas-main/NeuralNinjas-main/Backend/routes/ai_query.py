from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.openai_service import OpenAIService
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Fixed: Renamed to ai_router to match main.py import
ai_router = APIRouter(tags=["AI"])
openai_service = OpenAIService()

class AskRequest(BaseModel):
    question: str

@ai_router.post("/ask")
async def ask_question(request: AskRequest):
    try:
        answer = await openai_service.answer_query(request.question)
        return {"success": True, "answer": answer}
    except Exception as e:
        logger.exception("AI query failed")
        raise HTTPException(status_code=500, detail=str(e))