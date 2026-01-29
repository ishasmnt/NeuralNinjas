import os
import asyncio
import logging
from groq import Groq

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OpenAIService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")

        self.client = Groq(api_key=self.api_key)
        logger.info("GroqService initialized with API key")

    async def answer_query(self, question: str) -> str:
        try:
            response = await asyncio.to_thread(
    lambda: self.client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are an AI strategy consultant."},
            {"role": "user", "content": question}
        ],
        temperature=0.7,
        max_tokens=500
    )
)


            answer = response.choices[0].message.content.strip()
            return answer

        except Exception as e:
            logger.exception("Groq API error")
            raise Exception(f"Groq error: {e}")
