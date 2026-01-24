from fastapi import APIRouter, Query
from services.assistant_logic import assistant_reply

assistant_router = APIRouter()

@assistant_router.get("/assistant")
def ai_assistant(question: str = Query(...)):
    answer = assistant_reply(question)
    return {
        "question": question,
        "answer": answer
    }
