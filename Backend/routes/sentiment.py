from fastapi import APIRouter
import pandas as pd

sentiment_router = APIRouter()

DATA_PATH = "data/raw/socialbuzz.csv"

@sentiment_router.get("/summary")
def sentiment_summary():
    df = pd.read_csv(DATA_PATH)

    sentiment_counts = df["Sentiment"].value_counts().to_dict()

    return {
        "sentiment_distribution": sentiment_counts
    }
