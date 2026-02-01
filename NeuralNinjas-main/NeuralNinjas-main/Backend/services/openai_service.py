import os
import asyncio
import logging
from groq import Groq

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OpenAIService:
    def __init__(self):
        # 1. Grab the key
        self.api_key = os.getenv("GROQ_API_KEY")
        
        # 2. Check if it exists without crashing the whole server
        if not self.api_key:
            logger.error("GROQ_API_KEY not found in environment variables. AI Chat disabled.")
            self.client = None
        else:
            try:
                self.client = Groq(api_key=self.api_key)
                logger.info("GroqService initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Groq client: {e}")
                self.client = None

    async def answer_query(self, question: str) -> str:
        # 3. Handle the case where the key is missing
        if not self.client:
            return "AI Service is currently unavailable (Missing API Key)."

        try:
            # 4. Use to_thread for the synchronous Groq SDK
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
            return response.choices[0].message.content.strip()

        except Exception as e:
            logger.exception("Groq API error")
            return f"Error: {str(e)}"