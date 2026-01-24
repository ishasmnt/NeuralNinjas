import pandas as pd

DATA_PATH = "data/processed/cleaned_data.csv"

def generate_ai_insights():
    df = pd.read_csv(DATA_PATH)

    # Safety check
    if df.empty:
        return {
            "summary": "Not enough data to generate insights.",
            "why": "",
            "recommendation": ""
        }

    # Best performing platform
    best_platform = (
        df.groupby("Platform")["Engagement"]
        .sum()
        .idxmax()
    )

    # Best posting hour
    best_hour = (
        df.groupby("Hour")["Engagement"]
        .mean()
        .idxmax()
    )

    # Sentiment trend
    positive_ratio = (df["Sentiment"] == "Positive").mean()

    sentiment_text = (
        "positive audience response"
        if positive_ratio > 0.5
        else "mixed or neutral audience response"
    )

    return {
        "summary": f"{best_platform} shows the highest overall engagement.",
        "why": f"Posts around {best_hour}:00 receive higher interactions with mostly {sentiment_text}.",
        "recommendation": (
            f"Post more content on {best_platform} "
            f"between {best_hour}:00–{best_hour+1}:00 using engaging captions and trending hashtags."
        )
    }
