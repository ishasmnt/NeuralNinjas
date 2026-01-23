# def generate_insight(question: str):
#     return (
#         "Your content performed well because it was posted at peak hours "
#         "and matched current audience interests."
#     )
from dotenv import load_dotenv
load_dotenv()

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-pro")
