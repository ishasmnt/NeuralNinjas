# from fastapi import APIRouter
# from pydantic import BaseModel
# from services.gemini_service import generate_insight

# router = APIRouter(prefix="/ai", tags=["AI"])

# class AIQuery(BaseModel):
#     question: str

# @router.post("/ask")
# def ask_ai(query: AIQuery):
#     insight = generate_insight(query.question)
#     return {
#         "question": query.question,
#         "answer": insight
#     }
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

# Pydantic model for request body
class AskRequest(BaseModel):
    question: str

@router.post("/ask")
async def ask_question(request: AskRequest):
    try:
        answer = await gemini_service.answer_query(request.question)
        return {"success": True, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
