import os
from pathlib import Path
from dotenv import load_dotenv

# 1. MOVE THIS TO THE TOP
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# 2. DEBUG PRINT (Optional)
print(f"--- Environment Check ---")
print(f"GROQ_API_KEY found: {'Yes' if os.getenv('GROQ_API_KEY') else 'No'}")
print(f"--------------")

# 3. NOW IMPORT YOUR ROUTERS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analytics import analytics_router
from routes.ai_query import ai_router 
from routes.sentiment import sentiment_router
from routes.upload import upload_router

app = FastAPI()

# Rest of your middleware and router includes...

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration with /api prefix
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])
app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
app.include_router(sentiment_router, prefix="/api/sentiment", tags=["sentiment"])
app.include_router(upload_router, prefix="/api/upload", tags=["upload"])

# This remains at the root
@app.get("/data-preview")
def preview():
    import pandas as pd
    df = pd.read_csv("data/processed/cleaned_data.csv")
    return df.head(5).to_dict(orient="records")