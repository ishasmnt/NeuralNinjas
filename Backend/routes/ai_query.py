from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import generate_insight

router = APIRouter(prefix="/ai", tags=["AI"])

class AIQuery(BaseModel):
    question: str

@router.post("/ask")
def ask_ai(query: AIQuery):
    insight = generate_insight(query.question)
    return {
        "question": query.question,
        "answer": insight
    }
