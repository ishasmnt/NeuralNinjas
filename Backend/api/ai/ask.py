from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

class AIQuery(BaseModel):
    question: str

@router.post("/ask")
async def ask_ai(query: AIQuery):
    try:
        response = await gemini_service.answer_query(query.question)
        return {"success": True, "answer": response.get("answer", "")}
    except Exception as e:
        return {"success": False, "error": str(e)}